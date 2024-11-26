// import { useEffect } from 'react';
import AuthForm from '../components/AuthForm';
import { login, getUserProfile } from '../api/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserProvider';

function Login() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  console.log(setUser);
  const handleLogin = async (formData) => {
    try {
      const data = await login(formData);
      console.log('LoginData', data);

      setUser(data);

      alert(`${data.nickname}님 환영합니다.`);
      navigate('/');
    } catch (error) {
      console.log(error);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div>
      <div>
        <h1>로그인</h1>
        <AuthForm mode='login' onSubmit={handleLogin} />
      </div>
    </div>
  );
}

export default Login;

// 텐스택 쿼리 : api
// 주스탠드 : api없는거... 다크모드