import styled from 'styled-components';
import {
  deleteTestResult,
  getTestResults,
  updateTestResultVisibility,
} from '../api/testResults';
import { mbtiDescriptions } from '../utils/mbtiCalculator';
import { UserContext } from '../context/UserProvider';
import { useContext } from 'react';
import { toast } from 'react-toastify';

const ResultItem = styled.li`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1rem;
`;

const Nickname = styled.h2`
  font-size: 1.5rem;
  color: #2d3748;
  margin-bottom: 0.5rem;
`;

const MbtiResult = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: #4a5568;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #718096;
  margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  justify-content: center;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  svg {
    margin-right: 0.5rem;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #e53e3e;
  color: white;

  &:hover {
    background-color: #c53030;
  }
`;

const VisibilityButton = styled(Button)`
  background-color: ${(props) => (props.isPublic ? '#3182ce' : '#48bb78')};
  color: white;

  &:hover {
    background-color: ${(props) => (props.isPublic ? '#2c5282' : '#2f855a')};
  }
`;

function TestResultItem({ result, testResults, setTestResults }) {
  const { user } = useContext(UserContext);
  const isOwner = user.userId === result.userId;

  // 테스트 결과 삭제 함수
  const handleDelete = async (id) => {
    try {
      // 테스트 결과 삭제 api 호출
      await deleteTestResult(id);
      setTestResults(testResults.filter((result) => result.id !== id));
      toast.success('삭제되었습니다.');
    } catch (error) {
      console.error('테스트 결과 삭제 오류:', error);
      toast.error('삭제 중 오류가 발생했습니다.');
    }
  };

  // 테스트 결과 활설화 / 비활성화 함수
  const handlePrivate = async (id, visibility) => {
    try {
      // 현재 visibility에 대해 반대가 될수 있도록함
      const newVisibility = !visibility;

      // 테스트 결과 목록 활성화/비활설화 변경 api 호출
      await updateTestResultVisibility(id, { visibility: newVisibility });
      setTestResults(
        testResults.map((result) =>
          result.id === id ? { ...result, visibility: newVisibility } : result
        )
      );

      // 테스트 결과 목록 api 호출
      await getTestResults();
      toast.success(
        newVisibility ? '공개로 전환되었습니다.' : '비공개로 전환되었습니다.'
      );
    } catch (error) {
      console.error('테스트 결과 visibility 변경 오류:', error);
      toast.error('변경 중 오류가 발생했습니다.');
    }
  };

  return (
    <ResultItem>
      <Nickname>{result.nickname}</Nickname>
      <MbtiResult>{result.result}</MbtiResult>
      <Description>
        {mbtiDescriptions[result.result] ||
          '해당 성격 유형에 대한 설명이 없습니다.'}
      </Description>
      {isOwner && (
        <ButtonContainer>
          <DeleteButton onClick={() => handleDelete(result.id)}>
            삭제
          </DeleteButton>
          <VisibilityButton
            isPublic={result.visibility}
            onClick={() => handlePrivate(result.id, result.visibility)}
          >
            {result.visibility ? '비공개로 전환' : '공개로 전환'}
          </VisibilityButton>
        </ButtonContainer>
      )}
    </ResultItem>
  );
}

export default TestResultItem;
