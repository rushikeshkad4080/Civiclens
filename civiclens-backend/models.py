from sqlalchemy import Column, Integer, String, Float
from database import Base

class Issue(Base):
    __tablename__ = "issues"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String)
    issue_type = Column(String)
    priority = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    status = Column(String, default="Pending")

class Shop(Base):
    __tablename__ = "shops"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    category = Column(String)
    address = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)

