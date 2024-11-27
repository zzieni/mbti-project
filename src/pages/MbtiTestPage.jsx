import { useContext, useState } from 'react';
import { calculateMBTI, mbtiDescriptions } from '../utils/mbtiCalculator';
import { createTestResult } from '../api/testResults';
import { useNavigate } from 'react-router-dom';
import TestForm from '../components/TestFrom.jsx';
import { UserContext } from '../context/UserProvider.jsx';
import { toast } from 'react-toastify';

function MbtiTestPage() {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const [resultData, setResultData] = useState({
    date: '',
    id: '',
    nickname: '',
    result: '',
    userId: '',
    visibility: true,
  });

  const [result, setResult] = useState();

  const handleTestSubmit = async (answers) => {
    try {
      const mbtiResult = calculateMBTI(answers);
      const currentDate = new Date().toISOString();

      const newResultData = {
        date: currentDate,
        nickname: user.nickname,
        result: mbtiResult,
        userId: user.userId,
        visibility: true,
      };

      setResultData(newResultData);
      await createTestResult(newResultData);
      setResult(mbtiResult);
      toast.success('MBTI 테스트 제출');
    } catch (error) {
      console.error('result error:', error);
    }
  };

  const handleNavigateToResults = () => {
    navigate('/results');
  };

  return (
    <div className='w-full flex flex-col items-center justify-center bg-white'>
      <div className='bg-white rounded-lg p-8 max-w-lg w-full h-full overflow-y-auto '>
        {!result ? (
          <div>
            <h1 className='text-3xl font-bold text-primary-color mb-6'>
              MBTI 테스트
            </h1>
            <TestForm onSubmit={handleTestSubmit} />
          </div>
        ) : (
          <>
            <h1 className='text-3xl font-bold text-primary-color mb-6'>
              테스트 결과: {result}
            </h1>
            <p className='text-lg text-gray-700 mb-6'>
              {mbtiDescriptions[result] ||
                '해당 성격 유형에 대한 설명이 없습니다.'}
            </p>
            <button
              onClick={handleNavigateToResults}
              className='w-full bg-primary-color text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition duration-300 hover:text-[#FF5A5F]'
            >
              결과 페이지로 이동하기
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default MbtiTestPage;
