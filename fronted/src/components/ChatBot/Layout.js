import React, { useState } from 'react';
import ChatSessionList from './ChatSessionList';
import { Outlet } from 'react-router-dom';
export default function Layout () {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // 사이드바 상태 관리

  // 사이드바 토글 함수
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <div className="layout-container">
      {/* 사이드바에 collapsed 클래스를 추가/제거하기 */}
      <div className={`sidebar ${isSidebarOpen ? '' : 'collapsed'}`}>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          {isSidebarOpen ? '◀' : '▶'}
        </button>
        {isSidebarOpen && (
          <div className="sidebar-logo"></div>
        )}
        <ChatSessionList />
      </div>
      <div className="main-content">
        
        <Outlet />
      </div>
    </div>
  );
  };