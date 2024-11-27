import {
  deleteTestResult,
  getTestResults,
  //   getTestResults,
  updateTestResultVisibility,
} from '../api/testResults';
import { mbtiDescriptions } from '../utils/mbtiCalculator';
import { UserContext } from '../context/UserProvider';
import { useContext } from 'react';
import { toast } from 'react-toastify';

function TestResultItem({ result, testResults, setTestResults }) {
  const { user } = useContext(UserContext);
  const isOwner = user.userId;

  const handleDelete = async (id) => {
    try {
      await deleteTestResult(id);
      setTestResults(testResults.filter((result) => result.id !== id));
      toast.success('삭제되었습니다.');
    } catch (error) {
      console.error('테스트 결과 삭제 오류:', error);
    }
  };

  const handlePrivate = async (id, visibility) => {
    try {
      const newVisibility = !visibility;
      console.log(newVisibility);

      const resultPrivate = await updateTestResultVisibility(id, {
        visibility: newVisibility,
      });
      console.log(resultPrivate);

      setTestResults(
        testResults.map((result) =>
          result.id === id ? { ...result, visibility: newVisibility } : result
        )
      );
      await getTestResults();
      toast.success('비공개로 처리되었습니다.');
    } catch (error) {
      console.error('테스트 결과 삭제 오류:', error);
    }
  };

  // const handleDelete = async (id) => {
  //   try {
  //     await deleteTestResult(id);
  //     setTestResults(testResults.filter((result) => result.id !== id));
  //   } catch (error) {
  //     console.error('테스트 결과 삭제 오류:', error);
  //   }
  // };

  // const handlePrivate = async (id) => {
  //   try {
  //     const visibility = { visibility: false };
  //     const resultPrivate = await updateTestResultVisibility(id, visibility);
  //     console.log(resultPrivate);
  //     setTestResults(
  //       testResults.map((result) =>
  //         result.id === id ? { ...result, visibility: false } : result
  //       )
  //     );
  //   } catch (error) {
  //     console.error('테스트 결과 삭제 오류:', error);
  //   }
  // };

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
