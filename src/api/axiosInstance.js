import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://moneyfulpublicpolicy.co.kr',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('axiosInstance', user);
    if (user && user.accessToken) {
      // 로그인 시 인터셉터가 먼저 실행 되서 콘솔에 null 찍히지만 로그인 시 로컬 스토이지에 직접 넣어주는 로직이 있어 상관없음. 토큰이 필요한 api(닉네임 변경)에선 잘 동작 이상 무!
      config.headers.Authorization = `Bearer ${user.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
