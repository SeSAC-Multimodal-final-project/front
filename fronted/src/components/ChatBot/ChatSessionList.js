/* ChatSessionList.js */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ChatSessionList = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => { //컴포넌트가 처음 마운트될 때 한 번 실행
    // 백엔드 API 호출: 세션 목록 가져오기
    fetch('http://localhost:8000/sessions')
      .then(res => res.json()) //첫 번째 .then()은 fetch가 반환한 Promise가 이행(fulfilled)될 때 실행됩니다.
      .then(data => setSessions(data)) //두 번째 .then()은 JSON 파싱이 완료되어 실제 데이터가 준비되었을 때 실행됩니다.
      .catch(err => console.error(err)); //체인에 있는 어느 단계에서든 에러가 발생하면, 이 .catch()가 실행되어 에러를 콘솔에 출력합니다.
  }, []);

  return (
    <div>
      <h2>Chat Sessions</h2>
      <ul>
        {sessions.map(sessionId => (
          <li key={sessionId}>
            <Link to={`/chat/${sessionId}`}>{sessionId}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatSessionList;
