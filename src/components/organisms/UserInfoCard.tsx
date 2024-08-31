import { useEffect, useState } from 'react';
import { useSelectedUser } from '../context/SelectedUserContext';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import '../../index.css'

interface UserInfo {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  city: string;
  birthday: string;
  phone: string;
}

const UserInfoCard: React.FC = () => {
  const { selectedUser } = useSelectedUser();
  const { userId } = useUser();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const fetchUserInfo = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8081/api/users/${id}`);
      if (!response.ok) {
        throw new Error('Ошибка сети: ' + response.status);
      }
      const data: UserInfo = await response.json();
      setUserInfo(data);
      setError(null);
    } catch (error) {
      console.error('Ошибка при получении данных о пользователе:', error);
      setError('Не удалось загрузить данные пользователя.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userIdToFetch = selectedUser ? selectedUser.id : userId;
    if (userIdToFetch) {
      setLoading(true);
      fetchUserInfo(userIdToFetch);
    } else {
      setUserInfo(null);
    }
  }, [selectedUser, userId]);

  const handleViewProfile = () => {
    const idToView = selectedUser ? selectedUser.id : userId;
    if (idToView) {
      navigate(`/userinfopage/${idToView}`);
    }
  };

  return (
    <div className="user-info-card">
      <h1>Общие сведения</h1>
      {loading && <p>Загрузка информации о пользователе...</p>}
      {error && <p className="error">{error}</p>}
      {userInfo && (
        <div className="user-info-details">
          <h2><span>Фамилия:</span> {userInfo.lastName}</h2>
          <h2><span>Имя:</span> {userInfo.firstName}</h2>
          <h2><span>Отчество:</span> {userInfo.middleName}</h2>
          <h2><span>Город:</span> {userInfo.city}</h2>
          <h2><span>Дата рождения:</span> {userInfo.birthday}</h2>
        </div>
      )}
      <button onClick={handleViewProfile}>Посмотреть</button>
    </div>
  );
};

export default UserInfoCard;
