import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../user/AuthContext';
import './WritePost.css';

const WritePost: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [titleError, setTitleError] = useState('');
  const [contentError, setContentError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  const validateForm = () => {
    let valid = true;
    if (!title) {
      setTitleError('제목을 작성해주세요.');
      valid = false;
    } else {
      setTitleError('');
    }

    if (!category) {
      setCategoryError('카테고리를 선택해주세요.');
      valid = false;
    } else {
      setCategoryError('');
    }

    if (!content) {
      setContentError('내용을 작성해주세요.');
      valid = false;
    } else {
      setContentError('');
    }

    return valid;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Title:', title);
    console.log('Category:', category);
    console.log('Content:', content);
    if (!validateForm()) {
      return;
    }

    if (!user) {
      alert('로그인 후 이용이 가능합니다.');
      return;
    }

    const userId = localStorage.getItem('id'); // 로컬스토리지에서 사용자 ID를 가져옴

    const post = {
      title,
      content,
      category,
      author: user.nickname,
      userId, // 사용자 ID 추가
      date: new Date().toISOString().split('T')[0],
      views: 0,
    };

    try {
      const response = await fetch('http://172.20.10.12:8080/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(post),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="write-post">
      <h2>글 작성</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">제목</label>
          <input 
            type="text" 
            id="title" 
            value={title} 
            onChange={handleTitleChange} 
            placeholder="100자 이내로 입력해주세요" 
          />
          {titleError && <p className="error">{titleError}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="category">카테고리</label>
          <select id="category" value={category} onChange={handleCategoryChange}>
            <option value="">Select</option>
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
            <option value="category3">Category 3</option>
          </select>
          {categoryError && <p className="error">{categoryError}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="content">내용</label>
          <textarea 
            id="content" 
            value={content} 
            onChange={handleContentChange} 
            placeholder="2000 글자 이내로 입력해주세요" 
          />
          {contentError && <p className="error">{contentError}</p>}
        </div>
        <button type="submit">작성완료</button>
      </form>
    </div>
  );
};

export default WritePost;
