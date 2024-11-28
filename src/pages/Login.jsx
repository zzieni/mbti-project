import AuthForm from '../components/AuthForm';
import { login } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserProvider';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const LoginSinginupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Login() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      const data = await login(formData); // api/auth 로그인 api가 살행된다.
      setUser({ ...data, accessToken: data.accessToken }); // 전역 user 상태에 추가된다
      toast.success(`${data.nickname}님 환영합니다.`); // 로그인 성공 시 토스트 알럿 알림
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.warning('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <LoginSinginupContainer>
      <div>
        <h1>로그인</h1>
        <AuthForm mode='login' onSubmit={handleLogin} />
      </div>
    </LoginSinginupContainer>
  );
}

export default Login;

// 텐스택 쿼리 : api
// 주스탠드 : api없는거... 다크모드
