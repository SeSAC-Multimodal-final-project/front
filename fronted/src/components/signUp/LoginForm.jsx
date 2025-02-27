import React, { useState } from "react";
import { Checkbox } from "../ui/Checkbox";
import { Input } from "../ui/Input";
import { Link, useNavigate } from "react-router-dom";
import '../../output.css';

import axios from "axios";

// LoginForm component
export default function LoginForm() {
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/token", {
        userid,
        password
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.status === 200) {
        const data = response.data;
        // 로그인 성공 시 토큰을 로컬 스토리지에 저장
        localStorage.setItem("token", data.access_token);
        console.log("Login successful!", data);
        // 필요에 따라 다른 페이지로 이동
        navigate("/MainPage");
      }
    } catch (error) {
      console.error("Login failed!", error);
      // 로그인 실패 시 처리
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
            value={userid}
            onChange={(e) => setUserid(e.target.value)}
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
