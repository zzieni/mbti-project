import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getTestResults } from '../api/testResults';
import TestResultList from '../components/TestResultList';

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f0f4f8;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 2rem;
`;

const LoadingMessage = styled.div`
  font-size: 1.2rem;
  color: #3498db;
  text-align: center;
`;

const ErrorMessage = styled.div`
  font-size: 1.2rem;
  color: #e74c3c;
  text-align: center;
`;

const NoResultsMessage = styled.p`
  font-size: 1.2rem;
  color: #7f8c8d;
  text-align: center;
`;

function MbtiTestResultPage() {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      setError('테스트 결과를 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingMessage>로딩 중...</LoadingMessage>;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <PageContainer>
      <Title>MBTI 테스트 결과</Title>
      {testResults.length === 0 ? (
        <NoResultsMessage>사용 가능한 테스트 결과가 없습니다.</NoResultsMessage>
      ) : (
        <TestResultList
          testResults={testResults}
          setTestResults={setTestResults}
        />
      )}
    </PageContainer>
  );
}

export default MbtiTestResultPage;
