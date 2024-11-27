import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const UserContext = createContext(null);

// 페이지 전체적으로 사용될 유저 정보를 context를 사용하여 전역으로 관리
export default function UserProvider({ children }) {
  // 새로고침 대비해서 현재 유저 정보를 로컬스토리지로 관리
  const [user, setUser] = useState(() => {
    const saveUserData = localStorage.getItem('user');
    return saveUserData ? JSON.parse(saveUserData) : null;
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  // 로그인 시 로컬스토리지의 유저 데이터를 넣어준다
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // 로그아웃 시 로컬스토리지의 유저 데이터를 지워준다
  const logout = () => {
    toast.success('로그아웃 되었습니다');
    setUser(null);
    localStorage.removeItem('user');
  };

  // 현재 로그인 상태 정보 -> true: 로그인됨, false: 로그아웃됨
  const isLogin = !!user;

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, isLogin }}>
      {children}
    </UserContext.Provider>
  );
}
