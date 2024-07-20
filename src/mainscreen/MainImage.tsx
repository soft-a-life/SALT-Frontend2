import React from 'react';
import './MainImage.css';
import mainImage from '../image/logo_header.jpg'; // 이미지 파일 경로

const MainImage: React.FC = () => {
  return (
    <div className="main-image-container">
      <img src={mainImage} alt="Main Visual" className="main-image" />
      <div className="main-text">
        <h3>개발, AI 인공지능, 보안</h3>
        <h3>소프트웨어에 대한 모든 것</h3>
      </div>
    </div>
  );
};

export default MainImage;
