from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, Column, String, Integer, Date
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from typing import List
import secrets
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# 데이터베이스 설정 (MySQL)
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://root:1234@localhost/final_project"
engine = create_engine(SQLALCHEMY_DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# 사용자 데이터 모델
class UserData(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    area = Column(String(255))
    district = Column(String(255))
    birthDate = Column(Date)
    gender = Column(String(10))
    incomeRange = Column(String(50))
    personalCharacteristics = Column(String(255))
    householdCharacteristics = Column(String(255))


Base.metadata.create_all(bind=engine)

# 의존성
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 요청 데이터 모델 (Pydantic)
class UserDataRequest(BaseModel):
    area: str
    district: str
    birthDate: str  # 문자열 (ISO 8601 날짜)
    gender: str
    incomeRange: str
    personalCharacteristics: List[str]
    householdCharacteristics: List[str]

# 데이터 저장 엔드포인트
@app.post("/submit")
def submit_user_data(user: UserDataRequest, db: Session = Depends(get_db)):
    try:
        # 문자열 리스트를 ','로 연결해 저장
        personal_char_str = ",".join(user.personalCharacteristics)
        household_char_str = ",".join(user.householdCharacteristics)

        db_user = UserData(
            area=user.area,
            district=user.district,
            birthDate=user.birthDate,
            gender=user.gender,
            incomeRange=user.incomeRange,
            personalCharacteristics=personal_char_str,
            householdCharacteristics=household_char_str
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return {"message": "데이터 저장 성공", "id": db_user.id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
