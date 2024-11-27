import { useState, useEffect } from 'react';
import {
  deleteTestResult,
  getTestResults,
  updateTestResultVisibility,
} from '../api/testResults';
import { mbtiDescriptions } from '../utils/mbtiCalculator';

function MbtiTestResultPage() {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log('MbtiTestResultPage-testResults', testResults);

  useEffect(() => {
    fetchTestResults();
  }, []);

  const fetchTestResults = async () => {
    try {
      setLoading(true);
      const results = await getTestResults();
      setTestResults(results);
    } catch (err) {
      console.error('테스트 결과 가져오기 오류:', err);
    } finally {
      setLoading(false);
    }
  };

  loading ? <div>로딩 중...</div> : <div>오류</div>;

  const handleDelete = async (id) => {
    try {
      await deleteTestResult(id);
      setTestResults(testResults.filter((result) => result.id !== id));
    } catch (error) {
      console.error('테스트 결과 삭제 오류:', error);
    }
  };

  const handlePrivate = async (id) => {
    try {
      const visibility = { visibility: false };
      const resultPrivate = await updateTestResultVisibility(id, visibility);
      console.log(resultPrivate);
      setTestResults(
        testResults.map((result) =>
          result.id === id ? { ...result, visibility: false } : result
        )
      );
    } catch (error) {
      console.error('테스트 결과 삭제 오류:', error);
    }
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6'>MBTI 테스트 결과</h1>
      {testResults.length === 0 ? (
        <p>사용 가능한 테스트 결과가 없습니다.</p>
      ) : (
        <ul className='space-y-4'>
          {testResults.map((result) => (
            <li key={result.id} className='bg-white shadow rounded-lg p-4'>
              <h2 className='text-xl font-semibold'>{result.nickname}</h2>
              <p className='text-lg'>{result.result}</p>
              <p className='text-lg text-gray-700 mb-6'>
                {mbtiDescriptions[result.result] ||
                  '해당 성격 유형에 대한 설명이 없습니다.'}
              </p>
              <button onClick={() => handleDelete(result.id)}>삭제</button>
              <button onClick={() => handlePrivate(result.id)}>
                비공개로 전환
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MbtiTestResultPage;
