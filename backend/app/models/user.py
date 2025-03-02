from sqlalchemy import Column, String, Date
from app.core.db import Base

class UserData(Base):
    __tablename__ = "user"
    user_id = Column(String, primary_key=True, index=True)
    password = Column(String(255))
    username = Column(String(30))
    email = Column(String(100))
    phone = Column(String(20))
    area = Column(String(100))
    district = Column(String(100))
    birthDate = Column(Date)
    gender = Column(String(10))
    incomeRange = Column(String(100))
    personalCharacteristics = Column(String(255))
    householdCharacteristics = Column(String(255))
