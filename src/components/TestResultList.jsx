import styled from 'styled-components';
import TestResultItem from './TestResultItem';

const ResultList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0;
  margin: 0;
  list-style-type: none;
`;

function TestResultList({ testResults, setTestResults }) {
  return (
    <ResultList>
      {testResults.map((result) => (
        <TestResultItem
          key={result.id}
          testResults={testResults}
          setTestResults={setTestResults}
          result={result}
        />
      ))}
    </ResultList>
  );
}

export default TestResultList;
