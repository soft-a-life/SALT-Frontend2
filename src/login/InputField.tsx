//InputField 사용자 입력을 받는 입력필드
import React from 'react';
import TextField from '@mui/material/TextField';

//onChange는 입력 필드 값이 변경될 때 호출,
interface InputFieldProps {
    name: string;
    value: string;
    type: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

//컴포넌트의 Props와 반환타입을 명시적으로 지정하기 위해 React.FC 사용
const InputField: React.FC<InputFieldProps> = ({ name, value, type, placeholder, onChange }) => {
    return (
        <TextField
            variant="outlined" //입력필드의 윤곽선 스타일 지정
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            fullWidth //컨테이너의 전체 너비로 확장
            margin="normal" //입력필드 주변 마진 설정
        />
    );
};

export default InputField;
