import React, { useState } from 'react';
import InputField from './InputField';
import Button from '@mui/material/Button';
import axios from 'axios';

const SignUp: React.FC = () => {
    const [userInfo, setUserInfo] = useState({
        nickname: '',
        email: '',
        password: '',
    });

    const apiUrl = "http://172.20.10.12:8080/login/signup"; // 백엔드 API URL

    const handleChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
        setUserInfo((prevState) => ({
            ...prevState,
            [name]: value.replace(/[\/\\]/g, ''), // 특수 문자 필터링
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // 전송 전에 userInfo 로그 출력
        console.log('Sending user info:', userInfo);

        // 회원가입 처리
        try {
            const response = await axios.post(apiUrl, userInfo, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);
            alert('회원가입 완료');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error: ', error.response);
            } else {
                console.error('Unexpected error: ', error);
            }
            alert('회원가입 실패');
        }
    };

    const fields = [
        { type: 'text', name: 'nickname', placeholder: '닉네임' },
        { type: 'email', name: 'email', placeholder: '이메일' },
        { type: 'password', name: 'password', placeholder: '비밀번호' },
    ];

    return (
        <form onSubmit={handleSubmit}>
            {fields.map((field) => (
                <InputField
                    key={field.name}
                    type={field.type}
                    name={field.name}
                    value={userInfo[field.name as keyof typeof userInfo]} // Type Assertion 사용
                    onChange={handleChange}
                    placeholder={field.placeholder}
                />
            ))}
            <Button type="submit" variant="contained" color="primary">
                회원가입
            </Button>
        </form>
    );
};

export default SignUp;
