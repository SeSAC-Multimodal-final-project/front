// ChatSessionDetail.js
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import './ChatBot.css';

const ChatSessionDetail = () => {
  const { sessionId } = useParams(); // URL에서 sessionId를 추출합니다.
  const [chatHistory, setChatHistory] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const messagesEndRef = useRef(null);

  // 백엔드에서 해당 세션의 채팅 기록을 불러옵니다.
  useEffect(() => {
    fetch(`http://localhost:8000/sessions/${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.messages) {
          // 타임스탬프와 sender에 따라 메시지를 정렬합니다.
          const sortedMessages = data.messages.sort((a, b) => {
            return a.timestamp.localeCompare(b.timestamp) || (a.sender === 'user' ? -1 : 1);
          });
          setChatHistory(sortedMessages);
        } else {
          console.error("Invalid response format");
        }
      })
      .catch((err) => console.error(err));
  }, [sessionId]);
  

  // 메시지 전송 함수: 백엔드의 /chat 엔드포인트를 호출해 챗봇 응답을 받고,
  // 사용자와 챗봇 메시지를 백엔드에 저장합니다.
  const sendMessage = async (message) => {
    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      const timestamp = new Date().toISOString();
  
      const msg_user = { timestamp, sender: 'user', message: message };
      const msg_bot = { timestamp, sender: 'bot', message: data.response };
  
      // 클라이언트 상태에 메시지 추가
      setChatHistory((prev) => [...prev, msg_user, msg_bot]);
  
      // 백엔드에 사용자 메시지 저장
      await fetch(`http://localhost:8000/sessions/${sessionId}/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msg_user),
      });
  
      // 백엔드에 챗봇 응답 저장
      await fetch(`http://localhost:8000/sessions/${sessionId}/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msg_bot),
      });
    } catch (error) {
      console.error("메시지 전송 에러:", error);
    }
  };
  
  // 전송 버튼 클릭 시 처리
  const handleSend = () => {
    if (!currentMessage.trim()) return;
    sendMessage(currentMessage);
    setCurrentMessage('');
  };

  // 새로운 메시지가 추가되면 스크롤을 자동으로 맨 아래로 이동
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  return (
    <div className="chatbot-container">
      <div className="messages">
        {chatHistory.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
                {msg.message} {/*<em>{msg.timeStamp}</em>*/}
            </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className={`input-container ${'chat-started'}`}>
        <input
          type="text"
          placeholder="메시지를 입력하세요..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <button onClick={handleSend}>전송</button>
      </div>
    </div>
  );
};

export default ChatSessionDetail;
