import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { UserProvider } from './components/context/UserContext';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot를 사용하여 렌더링합니다.

root.render(
  <UserProvider>
    <App />
  </UserProvider>
);
