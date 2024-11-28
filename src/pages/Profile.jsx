import { useContext, useState } from 'react';
import styled from 'styled-components';
import { updateProfile } from '../api/auth';
import { UserContext } from '../context/UserProvider';
import { toast } from 'react-toastify';

const ProfileContainer = styled.div`
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #2d3748;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #4a5568;
  margin-bottom: 0.5rem;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #cbd5e0;
  border-radius: 4px;
  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
  }
`;

const Button = styled.button`
  background-color: #4299e1;
  color: white;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #3182ce;
  }
`;

function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [nickname, setNickname] = useState(user?.nickname || '');

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  // 닉네임 변경 기능 함수
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 프로필 변경 api 호출
      const data = await updateProfile({ nickname }, user.accessToken);

      if (data.success) {
        setUser({ ...user, nickname, avatar: data.avatar });
        toast.success('닉네임이 수정되었습니다.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.warning('프로필 수정에 실패하였습니다.');
    }
  };

  return (
    <ProfileContainer>
      <Title>프로필 수정</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor='nickname'>닉네임</Label>
          <Input
            id='nickname'
            type='text'
            value={nickname}
            onChange={handleNicknameChange}
          />
        </FormGroup>
        <Button type='submit'>프로필 업데이트</Button>
      </Form>
    </ProfileContainer>
  );
}

export default Profile;
