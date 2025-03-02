from pydantic import BaseModel
from typing import List, Dict

class ChatMessage(BaseModel):
    timeStamp: str
    sender: str
    text: str

class ChatSession(BaseModel):
    session_id: str
    messages: List[ChatMessage]

class CreateSessionResponse(BaseModel):
    session_id: str

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str
