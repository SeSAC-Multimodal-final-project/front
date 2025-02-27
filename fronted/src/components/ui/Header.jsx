import React from 'react';
import { Link } from 'react-router-dom';
//import Logo from '../../assets/images/logo.svg';

export default function Header() {
  return (
      <header className="border-b border-[#bbbbbb]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-[#4ba6f7] text-3xl font-bold">
            Fundit
          </Link>
          <nav className="space-x-6 text-[#8a8a8a]">
            <Link to="/login" className="hover:text-[#4ba6f7]">
              로그인/회원가입
            </Link>
            <Link to="/mypage" className="hover:text-[#4ba6f7]">
              마이페이지
            </Link>
            <Link to="/services" className="hover:text-[#4ba6f7]">
              민원서비스
            </Link>
          </nav>
        </div>
      </header>
  );
}

/*
const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px',
  backgroundColor: '#f8f9fa', // 예시 배경색
};

const logoContainerStyle = {
  // 로고 컨테이너 스타일 (필요에 따라 추가)
};

const logoTextStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#007bff', // 예시 로고 텍스트 색상
};

const navStyle = {
  display: 'flex',
  gap: '20px',
};

const navLinkStyle = {
  textDecoration: 'none',
  color: '#343a40', // 예시 링크 텍스트 색상
  fontWeight: '500',
};
*/
