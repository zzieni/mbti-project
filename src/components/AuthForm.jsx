import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LoginJoinBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f8ff;
  height: 300px;
  width: 450px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 300px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

function AuthForm({ mode, onSubmit }) {
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    nickname: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('로그인 회원가입 버튼 클릭');
    onSubmit(formData);
    console.log('로그인 회원가입 버튼 클릭 인자', formData);
  };

  return (
    <LoginJoinBox>
      <Form onSubmit={handleSubmit}>
        <Input
          type='text'
          name='id'
          placeholder='id'
          value={formData.id}
          onChange={handleChange}
          required
          // minlength='4'
        />
        <Input
          type='password'
          name='password'
          placeholder='password'
          value={formData.password}
          onChange={handleChange}
          autoComplete='off'
          required
        />
        {mode === 'signup' && (
          <Input
            type='text'
            name='nickname'
            placeholder='닉네임'
            value={formData.nickname}
            onChange={handleChange}
            required
          />
        )}
        <Button type='submit'>
          {mode === 'login' ? '로그인' : '회원가입'}
        </Button>
      </Form>
      {mode === 'login' ? (
        <p>
          계정이 없으신가요? <Link to='/signup'>회원가입</Link>
        </p>
      ) : (
        <p>
          이미 계정이 있으신가요? <Link to='/login'>로그인</Link>
        </p>
      )}
    </LoginJoinBox>
  );
}

export default AuthForm;
