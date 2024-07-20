import React, { useEffect, useState } from 'react';
import { useAuth } from '../user/AuthContext';
import './MyPage.css';

const MyPage: React.FC = () => {
  const { user, login } = useAuth();
  const [email, setEmail] = useState<string>(user?.email || '');
  const [userUuid, setUserUuid] = useState<string>('');

  useEffect(() => {
    if (user) {
      setEmail(user.email || '');
    }
  }, [user]);

  const handleUserUuidChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserUuid(event.target.value);
  };

  const handleUserUuidUpdate = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const url = new URL('http://172.20.10.12:8080/user/useruuid');
      url.searchParams.append('email', email);
      url.searchParams.append('useruuid', userUuid);

      fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text(); // 응답을 텍스트로 변환
      })
      .then(data => {
        alert(`UUID updated successfully: ${data}`);
        const updatedUser = { 
          ...user, 
          userUuid: data, 
          nickname: user?.nickname || '', // nickname이 undefined가 되지 않도록 설정
          email: user?.email || '' // email이 undefined가 되지 않도록 설정
        }; 
        login(updatedUser); // 전역 상태 업데이트
      })
      .catch(error => {
        console.error('Error updating UUID:', error);
      });
    }
  };

  return (
    <div className="mypage">
      <h1>My Page</h1>
      <div className="user-info">
        <label>Email:</label>
        <span>{email}</span>
      </div>
      <div className="user-info">
        <label>UUID:</label>
        <input 
          type="text" 
          value={userUuid} 
          onChange={handleUserUuidChange} 
        />
      </div>
      <button onClick={handleUserUuidUpdate}>Update UUID</button>
    </div>
  );
}

export default MyPage;
