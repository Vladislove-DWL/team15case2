import { useEffect, useState } from 'react';
import ProfileButton from '../atoms/ProfileButton';
import { useUser } from '../context/UserContext';
import { useParams } from 'react-router-dom'; 


interface User {
  id: number;
  badge: number; 
  firstName: string;
  lastName: string;
  middleName: string;
  birthday: string;
  city: string;
  phone: string;
}

const UserInfoPage: React.FC = () => {
  const { userId } = useUser();
  const { userId: paramUserId } = useParams<{ userId: string }>(); 
  const [user, setUser] = useState<User | null>(null); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const idToFetch = paramUserId ? parseInt(paramUserId) : userId;

      try {
        const response = await fetch(`http://localhost:8081/api/users/${idToFetch}`);
        if (!response.ok) {
          throw new Error(`Ошибка при загрузке данных: ${response.status}`);
        }
        const fetchedUser: User = await response.json();
        setUser(fetchedUser);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Произошла ошибка при загрузке данных");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [paramUserId, userId]); 

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => (prevUser ? { ...prevUser, [name]: value } : null));
  };

  const handleSaveChanges = async () => {
    if (!user) return;

    try {
      const response = await fetch(`http://localhost:8081/api/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error(`Ошибка при сохранении данных: ${response.status}`);
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Произошла ошибка при сохранении данных");
    }
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div>
      <ProfileButton />
      <h1>Информация о пользователе</h1>
      {user ? ( 
        <div style={{ backgroundColor: '#00A4DC', color: 'white', fontSize: '1.5rem', padding: '15px', borderRadius: '20px' }}>
          <p><strong>ID:</strong> {user.id}</p>
          
          {isEditing && user.id === userId ? (
            <>
              <p><strong>Имя:</strong> <input type="text" name="firstName" value={user.firstName} onChange={handleInputChange} /></p>
              <p><strong>Фамилия:</strong> <input type="text" name="lastName" value={user.lastName} onChange={handleInputChange} /></p>
              <p><strong>Отчество:</strong> <input type="text" name="middleName" value={user.middleName} onChange={handleInputChange} /></p>
              <p><strong>Дата рождения:</strong> <input type="date" name="birthday" value={user.birthday} onChange={handleInputChange} /></p>
              <p><strong>Город:</strong> <input type="text" name="city" value={user.city} onChange={handleInputChange} /></p>
              <p><strong>Телефон:</strong> <input type="text" name="phone" value={user.phone} onChange={handleInputChange} /></p>
            </>
          ) : (
            <>
              <p><strong>Имя:</strong> {user.firstName}</p>
              <p><strong>Фамилия:</strong> {user.lastName}</p>
              <p><strong>Отчество:</strong> {user.middleName}</p>
              <p><strong>Дата рождения:</strong> {user.birthday}</p>
              <p><strong>Город:</strong> {user.city}</p>
              <p><strong>Телефон:</strong> {user.phone}</p>
            </>
          )}
        </div>
      ) : (
        <div>Загрузка...</div>
      )}
      {user && user.id === userId ? ( 
        <button onClick={isEditing ? handleSaveChanges : handleEditToggle}>
          {isEditing ? "Сохранить изменения" : "Редактировать"}
        </button>
      ) : (
        <p>Вы можете только просмотреть информацию о выбранном пользователе.</p>
      )}
    </div>
  );
};

export default UserInfoPage;  