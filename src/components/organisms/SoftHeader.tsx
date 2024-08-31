import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { useSelectedUser } from '../context/SelectedUserContext'; 
import '../../index.css'

interface UserData {
  lastName: string;
  firstName: string;
  middleName: string;
  email: string;
}

const SoftHeader: React.FC = () => {
  const { userId } = useUser(); 
  const { selectedUser } = useSelectedUser(); 
  const [userData, setUserData] = useState<UserData | null>(null); 
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const fetchUserData = async () => {
      const fetchUserId = selectedUser?.id || userId; 

      try {
        const response = await fetch(`http://localhost:8081/api/users/${fetchUserId}`);
        if (!response.ok) {
          throw new Error('Ошибка при загрузке данных пользователя');
        }
        const data = await response.json();
        setUserData(data); 
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false); 
      }
    };

    if (selectedUser || userId) {
      fetchUserData(); 
    }
  }, [userId, selectedUser]);

  if (isLoading) {
    return <p>Загрузка...</p>; 
  }

  if (error) {
    return <p>Ошибка: {error}</p>; 
  }

  if (!userData) {
    return <p>Данные пользователя не найдены</p>; 
  }

  return (
    <div className="soft-header">
      <p className="soft-header__text">ФИО: {`${userData.lastName} ${userData.firstName} ${userData.middleName}`}</p>
    </div>
  );
};

export default SoftHeader;
