import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChatBot.css';

const ChatBot = () => {
    const [chatHistory, setChatHistory] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const messagesEndRef = useRef(null);
    const [isChatStarted, setIsChatStarted] = useState(false);
    const [sessionId, setSessionId] = useState(null);
    const navigate = useNavigate();


    // 예시 질문 목록 (6개)
    const exampleQuestions = [
        '신청 가능한 보조금이 궁금해요',
        '자격 조건을 알고 싶어요',
        '절차가 복잡한가요?',
        '언제부터 지원받을 수 있나요?',
        '신청 서류는 어떤게 필요한가요?',
        '펀딧은 어떤 서비스를 제공하나요?',
    ];

    const createSession = async () => {
        try {
            const res = await fetch('http://localhost:8000/sessions', { method: 'POST' });
            const data = await res.json();
            setSessionId(data.session_id);
            return data.session_id
        } catch (error) {
          console.error("세션 생성 에러:", error);
          throw error;
        }
    };

    // API 호출하여 챗봇 응답 받기
    const sendMessage = async (message) => {
        let currentSessionId = sessionId;
        // 세션이 없으면 새로 생성한 후, 그 세션 ID를 사용합니다.
        if (!currentSessionId) {
            currentSessionId = await createSession();
        }
        
        try {
            const response = await fetch('http://localhost:8000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
            });
            const data = await response.json();

            // 현재 시간을 타임스탬프로 기록
            const timeStamp = new Date().toISOString();

            // 사용자와 챗봇 메시지 객체 생성
            const msg_user = { id:Date.now(), timeStamp, sender: 'user', text: message };
            const msg_bot = { id:Date.now()+1, timeStamp, sender: 'bot', text: data.response };

            // 클라이언트 채팅 기록 업데이트
            setChatHistory(prev => [...prev, msg_user, msg_bot]);

            //백엔드에 저장
            await fetch(`http://localhost:8000/sessions/${currentSessionId}/message`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(msg_user),
            });

            await fetch(`http://localhost:8000/sessions/${currentSessionId}/message`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(msg_bot),
            });

            navigate(`/chat/${currentSessionId}`);

        } catch (error) {
            console.error("메시지 전송 중 에러:", error);
        }
        };

    // 메시지 전송 공용 함수
    const handleSend = (text) => {
    if (!text.trim()) return;

    sendMessage(text);
    setCurrentMessage('');
    setIsChatStarted(true);
    };

    // 인풋창에서 "전송" 버튼 클릭
    const handleSendFromInput = () => {
        handleSend(currentMessage);
    };

    // 예시 질문 클릭 -> 메시지 자동 전송
    const handleExampleQuestionClick = (question) => {
        handleSend(question);
      };

    // 새로운 메시지가 추가되면 스크롤을 자동으로 맨 아래로 이동
    useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory]);

    return (
    <div className="chatbot-container">
        {/* 채팅 메시지 영역 */}
        <div className="messages">
        {chatHistory.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
                {message.text}
            </div>
        ))}
            <div ref={messagesEndRef} />
        </div>

      {/* 아직 채팅이 시작되지 않았다면 안내 문구 표시 */}
      {!isChatStarted && (
        <div className="intro-text">
          <strong>보조금 지원,</strong><br />
          이제 펀딧에게 물어보세요<br />
          간단하고 신속하게 해결됩니다!
        </div>
      )}

      {/* 입력창 (채팅 시작 후에도 계속 표시됨) */}
      <div className={`input-container ${isChatStarted ? 'chat-started' : ''}`}>
        <input
          type="text"
          placeholder="메시지를 입력하세요..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <button onClick={handleSendFromInput}>전송</button>
      </div>
      {!isChatStarted && (
        <div className="example-questions">
        {exampleQuestions.map((q, idx) => (
            <div 
              key={idx} 
              className="example-question-item"
              onClick={() => handleExampleQuestionClick(q)}
            >
                {q}
          </div>
        ))}
        </div>
      )}
    </div>
  );
};

export default ChatBot;
