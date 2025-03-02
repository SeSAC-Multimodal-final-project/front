import React, { useState } from "react";
import { Checkbox } from "../ui/Checkbox";
import { Input } from "../ui/Input";
import { Link, useNavigate } from "react-router-dom";
import '../../output.css';
import { useUser } from "../context/UserContext.js";
import axios from "axios";

// LoginForm component
export default function LoginForm() {
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [user_id, setUser_id] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://127.0.0.1:8000/login", {
        user_id,
        password
      }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true, // 쿠키 전송을 위해 추가
      });
  
      // axios는 response.data에 파싱된 데이터를 담고 있습니다.
      const userData = response.data;
      // 전역 사용자 컨텍스트 업데이트 (예: setUser)
      setUser(userData);
      navigate("/"); // 홈으로 이동
    } catch (error) {
      console.error("Login failed!", error);
      alert("로그인 실패!");
    }
  };
  
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-md mx-auto mt-20 px-4">
        <div className="text-center mb-16">
          <h1 className="text-[#4ba6f7] text-6xl font-bold">Fundit</h1>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <Input
            type="text"
            placeholder="아이디"
            className="w-full h-12 bg-[#f4f4f4] border-0 rounded-md"
            value={user_id}
            onChange={(e) => setUser_id(e.target.value)}
          />
          <Input
            type="password"
            placeholder="비밀번호"
            className="w-full h-12 bg-[#f4f4f4] border-0 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="w-full h-12 bg-[#4ba6f7] text-white rounded-md font-medium">
            로그인
          </button>
          <Link to="/signup" className="w-full h-12 bg-[#4ba6f7] text-white rounded-md font-medium flex items-center justify-center">
            회원가입
          </Link>
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="stay-logged-in"
                checked={stayLoggedIn}
                onChange={(event) => setStayLoggedIn(event.target.checked)}
              />
              <label htmlFor="stay-logged-in" className="text-sm text-[#8a8a8a] cursor-pointer">
                로그인 유지
              </label>
            </div>
            <Link to="/find-credentials" className="text-sm text-[#8a8a8a]">아이디/비밀번호 찾기</Link>
          </div>
        </form>

        <div className="flex justify-center space-x-8 mt-32 text-sm text-[#8a8a8a]">
          <Link to="/terms">이용약관</Link>
          <Link to="/privacy">개인정보처리방침</Link>
          <Link to="/inquiry">문의하기</Link>
        </div>
      </main>
    </div>
  );
}
