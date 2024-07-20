import React from 'react';

const BoardList: React.FC = () => {
  return (
    <div className="board-list">
      <h2>게시판 목록</h2>
      <ul>
        <li>전체 게시글</li>
        <li>인기 게시글</li>
        <li>AI 인공지능 게시글</li>
        <li>네트워크 게시글</li>
        <li>가입인사 게시글</li>
      </ul>
    </div>
  );
}

export default BoardList;
