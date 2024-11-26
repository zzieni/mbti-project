import AuthForm from '../components/AuthForm';
import { register } from '../api/auth';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();

  // 완성된 로직들이 아니에요! 참고만 하세요!
  const handleSignup = async (formData) => {
    try {
      const data = await register(formData);
      console.log('siginupData', data);

      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error);
      const errorMessage = `회원가입에 실패했습니다. 다시 시도해주세요. \n${error.response?.data?.message}`;
      alert(errorMessage);
    }
  };

  return (
    <div>
      <div>
        <h1>회원가입</h1>
        <AuthForm mode='signup' onSubmit={handleSignup} />
        <div>
          <p>
            이미 계정이 있으신가요? <Link to='/login'>로그인</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
