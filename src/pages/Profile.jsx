import { useContext, useState } from 'react';
import { updateProfile } from '../api/auth';
import { UserContext } from '../context/UserProvider';
import { toast } from 'react-toastify';

function Profile() {
  const { user, setUser } = useContext(UserContext);

  const [nickname, setNickname] = useState(user?.nickname || '');
  console.log(nickname);

  console.log('ProfileData', user);

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await updateProfile({ nickname }, user.accessToken);

      console.log(data);
      if (data.success) {
        setUser({ ...user, nickname, avatar: data.avatar });
        toast.success('닉네임이 수정되었습니다.');
      }
    } catch (error) {
      console.log(user);
      console.error('Signup error:', error);
      toast.warning('프로필 수정에 실패 하였습니다.');
    }
  };

  return (
    <div>
      <div>
        <h1>프로필 수정</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>닉네임</label>
            <input onChange={handleNicknameChange} />
          </div>
          <button type='submit'>프로필 업데이트</button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
