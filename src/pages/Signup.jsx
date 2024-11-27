import AuthForm from '../components/AuthForm';
import { register } from '../api/auth';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Signup() {
  const navigate = useNavigate();

  // 완성된 로직들이 아니에요! 참고만 하세요!
  const handleSignup = async (formData) => {
    try {
      const data = await register(formData);
      console.log('siginupData', data);
      toast.success('회원가입을 완료 하습니다.');
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error);
      const errorMessage = `${error.response?.data?.message}`;
      toast.warning(errorMessage);
    }
  };

  return (
    <div>
      <div>
        <h1>회원가입</h1>
        <AuthForm mode='signup' onSubmit={handleSignup} />
      </div>
    </div>
  );
}

export default Signup;
