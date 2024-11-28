import AuthForm from '../components/AuthForm';
import { register } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Signup() {
  const navigate = useNavigate();

  const handleSignup = async (formData) => {
    try {
      await register(formData); // api/auth 회원가입 api가 살행된다.
      toast.success('회원가입을 완료 하습니다.'); // 회원가입 완료 시 토스트 알럿 알림
      navigate('/login'); // 회원가입이 완료되면 로그인 창으로 이동
    } catch (error) {
      console.error('Signup error:', error);
      const errorMessage = `${error.response?.data?.message}`;
      toast.warning(errorMessage);
    }
  };

  return (
    <loginSinginupContainer>
      <div>
        <h1>회원가입</h1>
        <AuthForm mode='signup' onSubmit={handleSignup} />
      </div>
    </loginSinginupContainer>
  );
}

export default Signup;
