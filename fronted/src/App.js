import React from 'react';
import './App.css';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/ui/Header';
import LoginForm from './components/signUp/LoginForm';
import SignUp0 from './components/signUp/SignUp0';
import SignUp1 from './components/signUp/SignUp1';
//import SignUp from './components/signUp/SignUp2';
import SignUp3 from './components/signUp/SignUp3';
import MainPage from './components/chat/MainPage';
import MyPage from './components/mypage/MyPage';
//
//import Services from './components/services/Services';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUp0 />} />    
        <Route path="/signup1" element={<SignUp1 />} />    
        <Route path="/signup3" element={<SignUp3 />} />    
        <Route path="/mypage" element={<MyPage />} />    
      </Routes>
    </Router>
  );
}

export default App;
