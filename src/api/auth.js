import axios from 'axios';

const API_URL = 'https://moneyfulpublicpolicy.co.kr';

// api를 호출하는 함수을 관리하기 위한 파일.  실제로 사용하는곳에서 함수 호출하여 보낸 파라미터를 이요한다.

// 회원가입 api
export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// 로그인 api
export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData); // [,config] -> 선택 값
  return response.data;
};

// 회원정보 확인 api
export const getUserProfile = async (token) => {
  // get: haderd에 담아서 요청 보내기
  const response = await axios.get(`${API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// 프로필 변경 api
export const updateProfile = async (formData, token) => {
  const response = await axios.patch(`${API_URL}/profile`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
