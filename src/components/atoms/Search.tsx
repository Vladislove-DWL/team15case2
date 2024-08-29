import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelectedUser } from '../context/SelectedUserContext'; // Импортируем хук для выбранного пользователя

// Интерфейс для данных пользователя
interface Person {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  birthday: string;
  city: string;
  phone: string;
}

const Search: React.FC = () => {
  const [query, setQuery] = useState<string>(''); // Для поиска по фамилии
  const [results, setResults] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(false); 
  const navigate = useNavigate(); // Хук для навигации

  const { setSelectedUser } = useSelectedUser(); // Используем хук для получения setSelectedUser

  // Функция для запроса данных
  const fetchPeople = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8081/api/users`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data: Person[] = await response.json();

      // Фильтрация данных на клиенте по фамилии
      const filteredData = data.filter(person =>
        person.lastName.toLowerCase().includes(query.toLowerCase())
      );

      setResults(filteredData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Обработчик изменения поля ввода
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value) {
      fetchPeople(); // Запрашиваем людей, если есть запрос
    } else {
      setResults([]); // Сбрасываем результаты, если нет запроса
    }
  };

  // Обработчик выбора пользователя
  const handleSelectPerson = (person: Person) => {
    setSelectedUser(person); // Сохраняем выбранного пользователя в контексте
  };

  return (
    <div>
      <input
        className='search'
        type="text"
        placeholder="Введите фамилию"
        value={query}
        onChange={handleInputChange}
      />
      {loading && <p>Загрузка...</p>}
      {results.length > 0 && (
        <ul className='dropdown'>
          {results.map(person => (
            <li key={person.id} onClick={() => handleSelectPerson(person)}>
              {person.lastName} {person.firstName} {person.middleName}
            </li>
          ))}
        </ul>
      )}
      {results.length === 0 && !loading && query && (
        <p>Нет результатов для "{query}"</p>
      )}
    </div>
  );
};

export default Search;