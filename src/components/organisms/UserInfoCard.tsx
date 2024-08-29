import React, { useEffect, useState } from 'react';
import { useSelectedUser } from '../context/SelectedUserContext'; // Импортируем хук для выбранного пользователя
import { useUser } from '../context/UserContext'; // Импортируем хук для авторизованного пользователя
import { useNavigate } from 'react-router-dom'; // Импортируем хук для навигации

// Определяем интерфейс для данных пользователя
interface UserInfo {
  id: number; // Добавляем ID для запроса
  firstName: string;
  lastName: string;
  middleName: string;
  city: string;
  birthday: string;
  phone: string;
}

const UserInfoCard: React.FC = () => {
  const { selectedUser } = useSelectedUser(); // Получаем выбранного пользователя из контекста
  const { userId } = useUser(); // Получаем авторизованного пользователя из контекста
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null); // Состояние для хранения информации о пользователе
  const [error, setError] = useState<string | null>(null); // Состояние для ошибок
  const [loading, setLoading] = useState<boolean>(true); // Состояние для загрузки
  const navigate = useNavigate(); // Инициализируем навигацию

  // Функция для получения информации о пользователе
  const fetchUserInfo = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8081/api/users/${id}`);
      if (!response.ok) {
        throw new Error('Ошибка сети: ' + response.status);
      }
      const data: UserInfo = await response.json(); // Указываем тип данных
      setUserInfo(data); // Устанавливаем данные в состояние
      setError(null); // Сбрасываем ошибку
    } catch (error) {
      console.error('Ошибка при получении данных о пользователе:', error);
      setError('Не удалось загрузить данные пользователя.'); // Устанавливаем сообщение об ошибке
    } finally {
      setLoading(false); // Завершаем загрузку
    }
  };

  // Используем useEffect для получения данных при изменении выбранного пользователя или авторизованного пользователя
  useEffect(() => {
    const userIdToFetch = selectedUser ? selectedUser.id : userId; // Проверяем, какой пользователь должен быть загружен

    if (userIdToFetch) {
      setLoading(true); // Начинаем загрузку
      fetchUserInfo(userIdToFetch); // Запрашиваем информацию о выбранном или авторизованном пользователе
    } else {
      setUserInfo(null); // Если ни один пользователь не выбран, сбрасываем данные
    }
  }, [selectedUser, userId]); // Запрос выполняется каждый раз, когда selectedUser или userId изменяются

  // Обработчик нажатия кнопки "Посмотреть"
  const handleViewProfile = () => {
    const idToView = selectedUser ? selectedUser.id : userId; // Определяем ID для перехода
    if (idToView) {
      navigate(`/userinfopage/${idToView}`); // Перенаправляем на страницу пользователя
    }
  };

  return (
    <div style={{ background: '#00A4DC', padding: '20px', borderRadius: '5px', margin: '20px', color: 'white' }}>
      <h1>Общие сведения</h1>
      {loading && <p>Загрузка информации о пользователе...</p>} {/* Сообщение при загрузке */}
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Отображаем ошибку, если она есть */}
      {userInfo && ( // Проверяем, есть ли данные о пользователе
        <div>
          <h2><span style ={{color: 'black'}}>Фамилия:</span> {userInfo.lastName}</h2>
          <h2><span style ={{color: 'black'}}>Имя:</span> {userInfo.firstName}</h2>
          <h2><span style ={{color: 'black'}}>Отчество:</span> {userInfo.middleName}</h2>
          <h2><span style ={{color: 'black'}}>Город:</span> {userInfo.city}</h2>
          <h2><span style ={{color: 'black'}}>Дата рождения:</span> {userInfo.birthday}</h2>
        </div>
      )}
      <button onClick={handleViewProfile} style={{ marginTop: '10px' }}>
        Посмотреть
      </button>
    </div>
  );
};

export default UserInfoCard;