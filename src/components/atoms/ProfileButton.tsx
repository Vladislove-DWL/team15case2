// import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelectedUser } from '../context/SelectedUserContext'; // Импортируйте ваш контекст

const ProfileButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setSelectedUser } = useSelectedUser(); // Получаем функцию для сброса ID

  const handleProfilePage = () => {
    // Проверяем, находимся ли на странице профиля
    if (location.pathname === '/profilepage') {
      setSelectedUser(null); // Сброс ID выбранного пользователя
    }
    navigate('/profilepage'); // Переход на страницу профиля
  };

  return (
    <button onClick={handleProfilePage}>Профиль</button>
  );
};

export default ProfileButton;