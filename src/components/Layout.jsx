import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../context/UserProvider';
import { useContext } from 'react';

const LayoutContainer = styled.header`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f8f9fa;
`;

const Content = styled.main`
  flex: 1;
  padding: 1rem;
`;

function Layout() {
  const { logout, isLogin } = useContext(UserContext);

  return (
    <LayoutContainer>
      <Navbar>
        <Link to={'/'}>
          <button>홈</button>
        </Link>
        {!isLogin ? (
          <Link to={'/login'}>
            <button>로그인</button>
          </Link>
        ) : (
          <>
            <Link to={'/profile'}>
              <button>프로필</button>
            </Link>
            <Link to={'/test'}>
              <button>테스트</button>
            </Link>
            <Link to={'/results'}>
              <button>테스트 결과</button>
            </Link>
            <Link to={'/'}>
              <button onClick={logout}>로그아웃</button>
            </Link>
          </>
        )}
      </Navbar>
      <Content>
        <Outlet />
      </Content>
    </LayoutContainer>
  );
}

export default Layout;
