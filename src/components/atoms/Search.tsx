import React, { useState, ChangeEvent, useEffect } from 'react';
import { useSelectedUser } from '../context/SelectedUserContext';

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

  const { setSelectedUser } = useSelectedUser(); // Используем хук для получения setSelectedUser

  useEffect(() => {
    // Устанавливаем debounce с задержкой в 1 секунду (1000 миллисекунд)
    const timeoutId = setTimeout(() => {
      if (query) {
        fetchPeople(); // Запрашиваем людей, если есть запрос
      } else {
        setResults([]); // Сбрасываем результаты, если нет запроса
        setLoading(false); // Убираем загрузку, если запрос пустой
      }
    }, 1000);

    // Очищаем таймер при изменении query или размонтировании компонента
    return () => clearTimeout(timeoutId);
  }, [query]);

  // Функция для запроса данных
  const fetchPeople = async () => {
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
      setLoading(false); // Убираем индикатор загрузки после завершения запроса
    }
  };

  // Обработчик изменения поля ввода
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setLoading(true); // Устанавливаем индикатор загрузки при вводе текста
  };

  // Обработчик выбора пользователя
  const handleSelectPerson = (person: Person) => {
    setSelectedUser(person); // Сохраняем выбранного пользователя в контексте
    setQuery(''); // Очищаем поле ввода
    setResults([]); // Скрываем выпадающий список
    setLoading(false); // Убираем загрузку
  };

  return (
    <div style={{ position: 'relative', width: '300px', marginRight: '40px' }}>
      <input
        className="search"
        type="text"
        placeholder="Введите фамилию"
        value={query}
        onChange={handleInputChange}
        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
      />
      {results.length > 0 && !loading && (
        <ul
          className="dropdown"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'white',
            border: '1px solid #ccc',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            listStyleType: 'none',
            margin: 0,
            padding: '8px 0',
            maxHeight: '200px',
            overflowY: 'auto',
          }}
        >
          {results.map(person => (
            <li
              key={person.id}
              onClick={() => handleSelectPerson(person)} // Вызываем функцию выбора пользователя
              style={{
                padding: '8px 16px',
                cursor: 'pointer',
                borderBottom: '1px solid #eee',
              }}
            >
              {person.lastName} {person.firstName} {person.middleName}
            </li>
          ))}
        </ul>
      )}
      {results.length === 0 && !loading && query && (
        <ul
          className="dropdown"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'white',
            border: '1px solid #ccc',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            listStyleType: 'none',
            margin: 0,
            padding: '8px 0',
            maxHeight: '200px',
            overflowY: 'auto',
          }}
        >
          <li
            style={{
              padding: '8px 16px',
              cursor: 'default',
              color: '#999',
              textAlign: 'center',
            }}
          >
            Нет результатов для "{query}"
          </li>
        </ul>
      )}
    </div>
  );
};

export default Search;
