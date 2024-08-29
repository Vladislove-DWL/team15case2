import React from 'react';
import { useLocation } from 'react-router-dom';
import UserInfoCard from '../organisms/UserInfoCard';
import UserHardCard from '../organisms/UserHardCard';
import UserSoft from '../organisms/UserSoftCard';
import Search from '../atoms/Search';
import ProfileButton from '../atoms/ProfileButton';
import { useUser } from '../context/UserContext';
import ProfilePageHeader from '../organisms/ProfilePageHeader';

const ProfilePage: React.FC = () => {
  const location = useLocation();
  const { userId } = useUser(); // Получаем userId из контекста

  // Проверяем, существует ли location.state
  const { selectedPersonId } = location.state || {}; // Используем || {} для предотвращения ошибок

  if (userId === null) {
    return <h2>Пользователь не авторизован. Пожалуйста, войдите в систему.</h2>;
  }

  // Если selectedPersonId не передан, используем userId
  const personIdToDisplay = selectedPersonId !== undefined ? selectedPersonId : userId;

  return (
    <div>
      <ProfilePageHeader></ProfilePageHeader>
      <ProfileButton />
      <Search />
      <UserInfoCard selectedPersonId={personIdToDisplay} /> {/* Передаем ID выбранного пользователя */}
      <UserSoft />
      <UserHardCard />
      <p>Ваш уникальный идентификатор пользователя: {userId}</p>
      {selectedPersonId !== undefined ? (
        <p>Выбранный пользователь ID: {selectedPersonId}</p>
      ) : (
        <p>Пока выбранный пользователь недоступен.</p>
      )}
    </div>
  );
};

export default ProfilePage;