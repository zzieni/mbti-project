import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const UserContext = createContext(null);

export default function UserProvider({ children }) {
  //   새로고침 대비해서 현재 유저 정보를 가져오자 !
  const [user, setUser] = useState(() => {
    const saveUserData = localStorage.getItem('user');
    return saveUserData ? JSON.parse(saveUserData) : null;
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    toast.success('로그아웃 되었습니다');
    setUser(null);
    localStorage.removeItem('user');
  };
  console.log(user);
  const isLogin = !!user;

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, isLogin }}>
      {children}
    </UserContext.Provider>
  );
}
