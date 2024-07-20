import React from 'react';
import './KakaoLogin.css';

const KakaoLogin: React.FC<{ onLogin: (user: { nickname: string; email: string }) => void }> = ({ onLogin }) => {
  
  const handleLogin = () => {
    window.location.href = "http://172.20.10.12:8080/oauth2/authorization/kakao";
  };

  return (
    <div>
      <div className="kakaoLoginText"><h2>로그인</h2></div>
      <div className="contour"></div>
      <div className="button" onClick={handleLogin}></div>
    </div>
  );
}

export default KakaoLogin;


