from fastapi import APIRouter, HTTPException
from app.schemas.chat import ChatMessage, ChatSession, CreateSessionResponse, ChatRequest, ChatResponse
from typing import Dict, List
from uuid import uuid4
from app.services.openai_service import request_gpt

router = APIRouter()

# In-memory storage for demonstration (replace with a database in production)
chat_sessions: Dict[str, List[Dict]] = {}

# Endpoint to create a new chat session
@router.post("/sessions", response_model=CreateSessionResponse)
async def create_session():
    session_id = str(uuid4()) #중복방지처리 안됨
    chat_sessions[session_id] = []  # initialize an empty message list
    return CreateSessionResponse(session_id=session_id)

'''
@app.post("/sessions/{session_id}/message") 라는 경로에 있는 {session_id} 부분이
프론트엔드에서 전달한 세션 아이디로 채워지고, 함수의 인자로 session_id: str에 할당됩니다.
'''
# Endpoint to add a message to a session
@router.post("/sessions/{session_id}/message")
async def add_message(session_id: str, message: ChatMessage):
    if session_id not in chat_sessions:
        raise HTTPException(status_code=404, detail="Session not found")
    
    message_dict = message.dict()
    # 메모리 내 저장
    chat_sessions[session_id].append(message_dict)
    # CSV 파일에 저장
    #save_message_to_csv(session_id, message_dict)

    return {"status": "success"}

# 특정 세션의 채팅 기록 조회 엔드포인트
@router.get("/sessions/{session_id}", response_model=ChatSession)
async def get_session(session_id: str):
    if session_id not in chat_sessions:
        raise HTTPException(status_code=404, detail="Session not found")
    return ChatSession(session_id=session_id, messages=chat_sessions[session_id])

# 모든 세션 목록 조회 (사이드바에 표시)
@router.get("/sessions", response_model=List[str])
async def list_sessions():
    return list(chat_sessions.keys())

# 챗봇 엔드포인트 (예: POST /chat)
@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(chat: ChatRequest):

    gpt_response = request_gpt(chat.message)

    return ChatResponse(response=gpt_response)
