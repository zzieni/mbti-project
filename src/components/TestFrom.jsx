import { useState } from 'react';
import styled from 'styled-components';
import { questions } from '../data/questions';

const FormContainer = styled.form`
  max-width: 600px;
  margin: 0 auto;
`;

const QuestionContainer = styled.div`
  margin-bottom: 2rem;
  background-color: #f7fafc;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const QuestionText = styled.p`
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1rem;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const OptionLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  cursor: pointer;
`;

const RadioInput = styled.input`
  margin-right: 0.5rem;
`;

const SubmitButton = styled.button`
  background-color: #4299e1;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3182ce;
  }
`;

const TestForm = ({ onSubmit }) => {
  const [answers, setAnswers] = useState(
    Array(questions.length).fill({ type: '', answer: '' })
  );

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = { type: questions[index].type, answer: value };
    setAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Answers:', answers);
    onSubmit(answers);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      {questions.map((q, index) => (
        <QuestionContainer key={q.id}>
          <QuestionText>{q.question}</QuestionText>
          <OptionsContainer>
            {q.options.map((option, i) => (
              <OptionLabel key={i}>
                <RadioInput
                  type='radio'
                  name={`question-${index}`}
                  value={q.type.split('/')[i]}
                  checked={answers[index]?.answer === q.type.split('/')[i]}
                  onChange={() => handleChange(index, q.type.split('/')[i])}
                />
                {option}
              </OptionLabel>
            ))}
          </OptionsContainer>
        </QuestionContainer>
      ))}
      <SubmitButton type='submit'>제출하기</SubmitButton>
    </FormContainer>
  );
};

export default TestForm;
