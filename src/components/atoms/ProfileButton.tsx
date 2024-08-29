
import { useNavigate } from 'react-router-dom';

const ProfileButton: React.FC = () => {
  const navigate = useNavigate();

  const handleProfilePage = () => {
    navigate('/profilepage');
  };

  return (
      <button onClick={handleProfilePage}>Профиль</button>
  );
};

export default ProfileButton;