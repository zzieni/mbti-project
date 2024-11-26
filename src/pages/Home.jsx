import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';

function Home() {
  const { isLogin } = useContext(UserContext);
  console.log(isLogin);

  return (
    <>
      <h1>무료 성격 테스트</h1>
      <p>자신의 성격 유형을 확인할 수 있도록 솔직하게 답변해 주세요.</p>
      {!isLogin ? (
        <Link to='/login'>
          <button>내 성격 알아보러 가기</button>
        </Link>
      ) : (
        <Link to='/test'>
          <button>내 성격 알아보러 가기</button>
        </Link>
      )}
    </>
  );
}

export default Home;
