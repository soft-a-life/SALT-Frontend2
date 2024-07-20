import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainBoardList.css';
import { useAuth } from '../user/AuthContext';

interface Post {
    id: number;
    title: string;
    author: string;
    date: string;
    views: number;
}

const MainBoardList: React.FC = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
    const fetchPosts = async () => {
        try {
        const response = await fetch('http://172.20.10.12:8080/posts', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setPosts(data);
        } catch (error) {
        console.error('Error fetching posts:', error);
        }
    };

    fetchPosts();
    }, []);

    const handleWritePost = () => {
        if (isLoggedIn) {
        navigate('/write');
    } else {
        alert('로그인 후 이용이 가능합니다.');
    }
};

    //게시글 클릭시 아이디값을 찾아 상세페이지로 들어감
    const handlePostClick = (id: number) => {
    navigate(`/posts/${id}`);
  };

  return (
    <div className="board-list">
      <h2>전체 게시글</h2>
      <button onClick={handleWritePost} className="write-button">글 작성</button>
      <table>
        <thead>
          <tr>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{post.author}</td>
              <td>{post.date}</td>
              <td>{post.views}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MainBoardList;
