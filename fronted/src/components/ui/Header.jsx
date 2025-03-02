import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from "../context/UserContext.js";
// import Logo from '../../assets/images/logo.svg';

export default function Header() {
  const { user, setUser } = useUser();

  // 로그인 상태 확인 함수
  const checkLoginStatus = async () => {
    try {
      const response = await fetch("http://localhost:8000/me", {
        credentials: "include", // 쿠키 기반 세션 유지
      });

      if (!response.ok) {
        throw new Error("Not logged in");
      }

      const data = await response.json();
      setUser(data); // 사용자 정보 저장
    } catch (error) {
      setUser(null); // 로그인 실패 시 초기화
    }
  };

  // 컴포넌트 마운트 시 로그인 상태 확인
  useEffect(() => {
    checkLoginStatus();
  }, []);

  // 로그아웃 함수
  const handleLogout = async () => {
    await fetch("http://localhost:8000/logout", {
      method: "POST",
      credentials: "include",
    });

    setUser(null); // 로그아웃 후 상태 초기화
  };
 
  return (
    <header className="border-b border-[#bbbbbb]">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-[#4ba6f7] text-3xl font-bold">
          Fundit
        </Link>
        <nav className="space-x-6 text-[#8a8a8a]">
          {user ? (
            // 로그인 상태
            <>
              <span>{user.user_id}님, 환영합니다!</span>
              <Link to="/mypage" className="hover:text-[#4ba6f7]">마이페이지</Link>
              <button onClick={handleLogout} className="hover:text-[#4ba6f7]">로그아웃</button>
              <Link to="/services" className="hover:text-[#4ba6f7]">민원서비스</Link>
            </>
          ) : (
            // 로그아웃 상태
            <>
             <Link to="/login" className="hover:text-[#4ba6f7]">로그인 </Link>
             <Link to="/signup" className="hover:text-[#4ba6f7]">회원가입 </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
