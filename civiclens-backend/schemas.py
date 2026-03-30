from pydantic import BaseModel

class IssueCreate(BaseModel):
    description: str

class IssueResponse(BaseModel):
    id: int
    description: str
    issue_type: str
    priority: str

    class Config:
        from_attributes = True
