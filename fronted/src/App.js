/* App.js */
import React  from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import ChatSessionList from './components/ChatBot/ChatSessionList';
import ChatBot from './components/ChatBot/ChatBot.js';
import ChatSessionDetail from './components/ChatBot/ChatSessionDetail';
import Layout from './components/ChatBot/Layout.js';
import Header from './components/ui/Header';
import LoginForm from './components/signUp/LoginForm';
import SignUp0 from './components/signUp/SignUp0';
import SignUp1 from './components/signUp/SignUp1';
//import SignUp from './components/signUp/SignUp2';
import SignUp3 from './components/signUp/SignUp3';
import MainPage from './components/ChatBot/MainPage';
import MyPage from './components/mypage/MyPage';
import './App.css';
//import './index.css'
// Layout 컴포넌트: 좌측 사이드바와 우측 메인 영역을 구성합니다.


function App() {
  return (
    <Router>
      <Header /> 
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="chat" element={<Layout />}>
          <Route index element={<ChatBot />} /> {/* /chat -> ChatBot */}
          <Route path=":sessionId" element={<ChatSessionDetail />} /> {/* /chat/세션ID -> ChatSessionDetail */}
        </Route>
        <Route path="login" element={<LoginForm />} />
        <Route path="signup" element={<SignUp0 />} />
        <Route path="signup1" element={<SignUp1 />} />
        <Route path="signup3" element={<SignUp3 />} />
        <Route path="mypage" element={<MyPage />} />

      </Routes>
    </Router>
  );
}

export default App;
