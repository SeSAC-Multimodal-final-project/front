#Mysql 데이터베이스 
import secrets
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    SECRET_KEY: str = secrets.token_hex(32)
    SQLALCHEMY_DATABASE_URL: str = "mysql+pymysql://root:1234@localhost/final_project"
    ALLOWED_ORIGINS: list = ["http://localhost:3000"]

settings = Settings()
