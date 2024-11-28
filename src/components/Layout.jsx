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
          <p>홈</p>
        </Link>
        {!isLogin ? (
          <Link to={'/login'}>
            <p>로그인</p>
          </Link>
        ) : (
          <>
            <Link to={'/profile'}>
              <p>프로필</p>
            </Link>
            <Link to={'/test'}>
              <p>테스트</p>
            </Link>
            <Link to={'/results'}>
              <p>테스트 결과</p>
            </Link>
            <Link to={'/'}>
              <p onClick={logout}>로그아웃</p>
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
