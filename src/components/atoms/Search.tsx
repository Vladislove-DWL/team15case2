import { useState, ChangeEvent, useEffect } from 'react';
import { useSelectedUser } from '../context/SelectedUserContext';
import '../../index.css'

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
  const [query, setQuery] = useState<string>(''); 
  const [results, setResults] = useState<Person[]>([]);

  const { setSelectedUser } = useSelectedUser();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query) {
        fetchPeople();
      } else {
        setResults([]);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const fetchPeople = async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/users`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data: Person[] = await response.json();

      const filteredData = data.filter(person =>
        person.lastName.toLowerCase().includes(query.toLowerCase())
      );

      setResults(filteredData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setResults([]);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSelectPerson = (person: Person) => {
    setSelectedUser(person);
    setQuery('');
    setResults([]);
  };

  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        placeholder="Введите фамилию"
        value={query}
        onChange={handleInputChange}
      />
      {results.length > 0 && (
        <ul className="dropdown" role="listbox">
          {results.map(person => (
            <li
              key={person.id}
              onClick={() => handleSelectPerson(person)}
              className="dropdown-item"
              role="option"
            >
              {person.lastName} {person.firstName} {person.middleName}
            </li>
          ))}
        </ul>
      )}
      {results.length === 0 && query && (
        <ul className="dropdown">
          <li className="no-results">
            Нет результатов для "{query}"
          </li>
        </ul>
      )}
    </div>
  );
};

export default Search;
