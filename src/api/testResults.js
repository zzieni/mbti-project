import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BASE_URL}/testResults`;

// 테스트 결과 목록 api
export const getTestResults = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// 테스트 결과를 넣어주는 api
export const createTestResult = async (resultData) => {
  const response = await axios.post(API_URL, resultData); // 크리에이트
  return response.data;
};

// 테스트 결과 삭제 api
export const deleteTestResult = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

// 테스트 결과 목록 활성화/비활설화 변경 api
export const updateTestResultVisibility = async (id, visibility) => {
  const response = await axios.patch(`${API_URL}/${id}`, visibility); // 크리에이트랑 업데이트 일때 두번떄 인자를 넣어서 알려줌
  return response.data;
};
