from fastapi import FastAPI, UploadFile, File, Depends, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel

from database import SessionLocal, engine
import models
from ai.nlp import classify_text
from ai.prediction import predict_priority

# =========================
# APP & DATABASE INIT
# =========================

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="CIVICLENS API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# DATABASE DEPENDENCY
# =========================

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# =========================
# REQUEST MODELS
# =========================

class RoleRequest(BaseModel):
    role: str

class ShopSearch(BaseModel):
    query: str

# =========================
# ISSUE ROUTES
# =========================

@app.get("/issues")
def get_all_issues(db: Session = Depends(get_db)):
    issues = db.query(models.Issue).all()
    return [
        {
            "id": issue.id,
            "description": issue.description,
            "issue_type": issue.issue_type,
            "priority": issue.priority,
            "latitude": issue.latitude,
            "longitude": issue.longitude
        }
        for issue in issues
    ]


@app.post("/report-issue")
def report_issue(
    description: str = Form(...),
    latitude: float = Form(...),
    longitude: float = Form(...),
    image: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    issue_type = classify_text(description)
    priority = predict_priority(issue_type)

    issue = models.Issue(
        description=description,
        issue_type=issue_type,
        priority=priority,
        latitude=latitude,
        longitude=longitude
    )

    db.add(issue)
    db.commit()
    db.refresh(issue)

    return {
        "id": issue.id,
        "issue_type": issue.issue_type,
        "priority": issue.priority
    }

# =========================
# SHOP SEEDING
# =========================

def seed_shops(db: Session):
    if db.query(models.Shop).count() == 0:
        shops = [
            models.Shop(
                name="Shiv Kirana Store",
                category="kirana",
                address="Main Road, City Center",
                latitude=19.076,
                longitude=72.8777
            ),
            models.Shop(
                name="Sai Medical",
                category="medical",
                address="Near Bus Stand",
                latitude=19.077,
                longitude=72.878
            ),
            models.Shop(
                name="Patel Hardware",
                category="hardware",
                address="Market Area",
                latitude=19.075,
                longitude=72.876
            ),
            models.Shop(
                name="Fresh Veggies Mart",
                category="vegetable",
                address="Subhash Chowk",
                latitude=19.078,
                longitude=72.879
            ),
            models.Shop(
                name="City Electronics",
                category="electronics",
                address="Station Road",
                latitude=19.074,
                longitude=72.875
            )
        ]
        db.add_all(shops)
        db.commit()

# =========================
# SHOP ROUTES
# =========================

@app.get("/shops")
def get_shops(db: Session = Depends(get_db)):
    seed_shops(db)
    return db.query(models.Shop).all()


@app.post("/shops/search")
def search_shops(data: ShopSearch, db: Session = Depends(get_db)):
    q = data.query.lower()

    # Simple AI-style intent matching
    if "kirana" in q or "grocery" in q:
        category = "kirana"
    elif "medical" in q or "medicine" in q:
        category = "medical"
    elif "hardware" in q or "pipe" in q:
        category = "hardware"
    elif "vegetable" in q or "sabji" in q:
        category = "vegetable"
    elif "electronics" in q:
        category = "electronics"
    else:
        category = None

    query_db = db.query(models.Shop)
    if category:
        query_db = query_db.filter(models.Shop.category == category)

    return query_db.all()

# =========================
# ROLE SELECTION (ONBOARDING)
# =========================

@app.post("/select-role")
def select_role(data: RoleRequest):
    if data.role == "civilian":
        return {"message": "Civilian access granted"}

    if data.role == "admin":
        return {"message": "Admin access granted"}

    raise HTTPException(status_code=400, detail="Invalid role")
