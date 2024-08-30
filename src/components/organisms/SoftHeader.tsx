import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { useSelectedUser } from '../context/SelectedUserContext'; // Импортируйте контекст выбранного пользователя

interface UserData {
  lastName: string;
  firstName: string;
  middleName: string;
  email: string;
}

const SoftHeader: React.FC = () => {
  const { userId } = useUser(); // Получаем userId из контекста авторизованного пользователя
  const { selectedUser } = useSelectedUser(); // Получаем выбранного пользователя из контекста
  const [userData, setUserData] = useState<UserData | null>(null); // Состояние для хранения данных пользователя
  const [isLoading, setIsLoading] = useState(true); // Состояние загрузки
  const [error, setError] = useState<string | null>(null); // Состояние ошибки

  useEffect(() => {
    // Функция для получения данных пользователя
    const fetchUserData = async () => {
      // Определяем, какой ID использовать
      const fetchUserId = selectedUser?.id || userId; // Если выбранный пользователь есть, используем его ID, иначе используем ID авторизованного пользователя

      try {
        const response = await fetch(`http://localhost:8081/api/users/${fetchUserId}`);
        if (!response.ok) {
          throw new Error('Ошибка при загрузке данных пользователя');
        }
        const data = await response.json();
        setUserData(data); // Устанавливаем данные пользователя в состояние
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false); // Завершаем загрузку
      }
    };

    if (selectedUser || userId) {
      fetchUserData(); // Выполняем запрос, если есть выбранный пользователь или авторизованный пользователь
    }
  }, [userId, selectedUser]);

  if (isLoading) {
    return <p>Загрузка...</p>; // Отображаем индикатор загрузки
  }

  if (error) {
    return <p>Ошибка: {error}</p>; // Отображаем сообщение об ошибке
  }

  if (!userData) {
    return <p>Данные пользователя не найдены</p>; // Отображаем, если данных нет
  }

  return (
    <div>
      <p>ФИО: {`${userData.lastName} ${userData.firstName} ${userData.middleName}`}</p>
    </div>
  );
};

export default SoftHeader;
