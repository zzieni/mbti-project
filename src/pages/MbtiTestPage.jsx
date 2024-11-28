import { useContext, useState } from 'react';
import styled from 'styled-components';
import { calculateMBTI, mbtiDescriptions } from '../utils/mbtiCalculator';
import { createTestResult } from '../api/testResults';
import { useNavigate } from 'react-router-dom';
import TestForm from '../components/TestFrom.jsx';
import { UserContext } from '../context/UserProvider.jsx';
import { toast } from 'react-toastify';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const ContentWrapper = styled.div`
  background-color: white;
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #4a5568;
  text-align: center;
  margin-bottom: 20px;
`;

const ResultText = styled.p`
  font-size: 1.1rem;
  color: #4a5568;
  text-align: center;
  margin-bottom: 30px;
  line-height: 1.6;
`;

const Button = styled.button`
  background-color: #4c51bf;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;

  &:hover {
    background-color: #434190;
  }
`;

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

  // 테스트 제출 버튼 실행 함수
  const handleTestSubmit = async (answers) => {
    try {
      const mbtiResult = calculateMBTI(answers);

      // 테스트 제출 일자 생성
      const currentDate = new Date().toISOString();

      // 로그인한 유저정보와 테스트 결과를 하나의 객체에 담아 준다
      const newResultData = {
        date: currentDate,
        nickname: user.nickname,
        result: mbtiResult,
        userId: user.userId,
        visibility: true,
      };

      setResultData(newResultData);

      // 테스트 결과 생성 api 호출
      await createTestResult(newResultData);
      setResult(mbtiResult);
      toast.success('MBTI 테스트 제출');
    } catch (error) {
      console.error('result error:', error);
      toast.error('테스트 제출 중 오류가 발생했습니다.');
    }
  };

  const handleNavigateToResults = () => {
    navigate('/results');
  };

  return (
    <PageContainer>
      <ContentWrapper>
        {!result ? (
          <div>
            <Title>MBTI 테스트</Title>
            <TestForm onSubmit={handleTestSubmit} />
          </div>
        ) : (
          <>
            <Title>테스트 결과: {result}</Title>
            <ResultText>
              {mbtiDescriptions[result] ||
                '해당 성격 유형에 대한 설명이 없습니다.'}
            </ResultText>
            <Button onClick={handleNavigateToResults}>
              결과 페이지로 이동하기
            </Button>
          </>
        )}
      </ContentWrapper>
    </PageContainer>
  );
}

export default MbtiTestPage;
