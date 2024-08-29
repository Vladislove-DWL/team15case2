import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext'; // Контекст авторизованного пользователя
import { useSelectedUser } from '../context/SelectedUserContext'; // Контекст выбранного через поисковик пользователя

const UserSoftCard: React.FC = () => {
  const { userId } = useUser(); // ID авторизованного пользователя
  const { selectedUser } = useSelectedUser(); // Данные выбранного пользователя через поисковик
  const navigate = useNavigate();

  // Определяем ID пользователя, по которому нужно получить soft skills
  const personIdToDisplay = selectedUser ? selectedUser.id : userId;

  // Обработчик клика по кнопке "Посмотреть"
  const handleViewSoftSkills = () => {
    navigate(`/usersoftpage/${personIdToDisplay}`);
  };

  return (
    <div style={{ background: '#00A4DC', padding: '20px', borderRadius: '5px', margin: '20px', color: 'white' }}>
      <h1>Soft Skills</h1>
      <h2>Софт-скиллы (soft skills) — это личностные качества, навыки общения и поведения,
        которые помогают эффективно взаимодействовать с другими людьми и адаптироваться к различным ситуациям.
        В отличие от хард-скиллов (hard skills), которые включают технические знания и профессиональные
        компетенции, софт-скиллы касаются вашего поведения, отношения к работе и способностей в общении.</h2>
      <button onClick={handleViewSoftSkills}>Посмотреть</button>
    </div>
  );
};

export default UserSoftCard;
