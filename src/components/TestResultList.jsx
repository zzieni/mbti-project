import TestResultItem from './TestResultItem';

function TestResultList({ testResults, setTestResults }) {
  return (
    <>
      <ul className='space-y-4'>
        {testResults.map((result) => (
          <TestResultItem
            key={result.id}
            testResults={testResults}
            setTestResults={setTestResults}
            result={result}
          />
        ))}
      </ul>
    </>
  );
}

export default TestResultList;
