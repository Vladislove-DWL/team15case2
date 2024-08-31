import { useNavigate, useLocation } from 'react-router-dom';
import { useSelectedUser } from '../context/SelectedUserContext'; 
import '../../index.css'

const ProfileButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setSelectedUser } = useSelectedUser(); 

  const handleProfilePage = () => {
    if (location.pathname === '/profilepage') {
      setSelectedUser(null); 
    }
    navigate('/profilepage'); 
  };

  return (
    <button className="profile-button" onClick={handleProfilePage}>
      Профиль
    </button>
  );
};

export default ProfileButton;
