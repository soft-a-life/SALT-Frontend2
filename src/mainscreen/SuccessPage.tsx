import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../user/AuthContext';

const SuccessPage: React.FC = () => {
  const [userData, setUserData] = useState<{ nickname: string, email: string } | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // 현재 위치 정보를 가져옴

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const mail = params.get('email');
    
    if (token && mail) {
      localStorage.setItem('token', token);
      localStorage.setItem('mail', mail);

      fetch('http://172.20.10.12:8080/login/success', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        setUserData(data);

        // Send email to backend
        const email = localStorage.getItem('mail');
        if (email) {
          fetch('http://172.20.10.12:8080/user/profile', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ email: email })
          })
          .then(response => response.json())
          .then(result => {
            // result로부터 받은 id 값을 로컬 스토리지에 저장
            localStorage.setItem('userId', result.id);
            
            console.log('Email sent successfully:', result);

            // 백엔드에서 받은 사용자 데이터를 AuthContext로 전달
            setUserData(result);
            login(result);

            // id 값을 다시 백엔드로 전달
            const userId = localStorage.getItem('userId');
            if (userId) {
              fetch('http://172.20.10.12:8080/user/update-id', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ id: userId })
              })
              .then(response => response.json())
              .then(updateResult => {
                console.log('ID updated successfully:', updateResult);
                navigate('/'); // 로그인 후 처음 페이지로 이동
              })
              .catch(error => {
                console.error('Error updating ID:', error);
              });
            }
          })
          .catch(error => {
            console.error('Error sending email:', error);
          });
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
    }
  }, [location.search, login, navigate]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, SuccessPage!</h1>
    </div>
  );
}

export default SuccessPage;













// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';


// const SuccessPage: React.FC = () => {
//   const [userData, setUserData] = useState<{ nickname: string, email: string } | null>(null);
//   const location = useLocation();

//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const token = params.get('token');
//     const mail = params.get('email');

//     if (token) {
//       localStorage.setItem('token', token);
//       if (mail) {
//         localStorage.setItem('mail', mail);
//       }

//       // Fetch user data using token
//       fetch('http://172.20.10.12:8080/login/success', {
//         method: 'GET',  // 명시적으로 GET 요청을 설정
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       })
//       .then(response => response.json())
//       .then(data => {
//         setUserData(data);

//         // Send email to backend
//         const email = localStorage.getItem('mail');
//         if (email) {
//           fetch('http://172.20.10.12:8080/user/profile', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${token}`
//             },
//             body: JSON.stringify({ email: email })
//           })
//           .then(response => response.json())
//           .then(result => {
//             setUserData(result);
//             console.log('Email sent successfully:', result
//             );

//           })
//           .catch(error => {
//             console.error('Error sending email:', error);
//           });
//         }
//       })
//       .catch(error => {
//         console.error('Error fetching user data:', error);
//       });
//     }
//   }, [location.search]);

//   if (!userData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>Welcome, {userData.nickname}!</h1>
//       <p>Email: {userData.email}</p>
//     </div>
//   );
// }

// export default SuccessPage;
