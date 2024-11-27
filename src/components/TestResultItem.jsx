import {
  deleteTestResult,
  getTestResults,
  updateTestResultVisibility,
} from '../api/testResults';
import { mbtiDescriptions } from '../utils/mbtiCalculator';
import { UserContext } from '../context/UserProvider';
import { useContext } from 'react';
import { toast } from 'react-toastify';

function TestResultItem({ result, testResults, setTestResults }) {
  const { user } = useContext(UserContext);

  // 현재 로그인한 userID
  const isOwner = user.userId;

  // 테스트 결과 삭제 함수
  const handleDelete = async (id) => {
    try {
      await deleteTestResult(id); // 테스트 결과 삭제 api 호출
      setTestResults(testResults.filter((result) => result.id !== id));
      toast.success('삭제되었습니다.');
    } catch (error) {
      console.error('테스트 결과 삭제 오류:', error);
    }
  };

  // 비공개 - 공개 전환 처리 함수
  const handlePrivate = async (id, visibility) => {
    try {
      const newVisibility = !visibility;

      // 테스트 결과 목록 활성화/비활설화 변경 api 호출
      await updateTestResultVisibility(id, {
        visibility: newVisibility,
      });

      setTestResults(
        testResults.map((result) =>
          result.id === id ? { ...result, visibility: newVisibility } : result
        )
      );
      await getTestResults();
    } catch (error) {
      console.error('테스트 결과 삭제 오류:', error);
    }
  };

  return (
    <>
      <li className='bg-white shadow rounded-lg p-4'>
        <h2 className='text-xl font-semibold'>{result.nickname}</h2>
        <p className='text-lg'>{result.result}</p>
        <p className='text-lg text-gray-700 mb-6'>
          {mbtiDescriptions[result.result] ||
            '해당 성격 유형에 대한 설명이 없습니다.'}
        </p>
        {isOwner === result.userId && (
          <>
            <button onClick={() => handleDelete(result.id)}>삭제</button>
            <button onClick={() => handlePrivate(result.id, result.visibility)}>
              {result.visibility === true ? '비공개로 전환' : '공개로 전환'}
            </button>
          </>
        )}
      </li>
    </>
  );
}

export default TestResultItem;
