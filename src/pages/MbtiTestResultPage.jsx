import { useState, useEffect } from 'react';
import { getTestResults } from '../api/testResults';
import TestResultList from '../components/TestResultList';

function MbtiTestResultPage() {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6'>MBTI 테스트 결과</h1>
      {testResults.length === 0 ? (
        <p>사용 가능한 테스트 결과가 없습니다.</p>
      ) : (
        <TestResultList
          testResults={testResults}
          setTestResults={setTestResults}
        />
      )}
    </div>
  );
}

export default MbtiTestResultPage;
