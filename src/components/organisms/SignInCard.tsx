import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

interface SignInCardProps {
  onRegisterClick: () => void;
}

const SignInCard: React.FC<SignInCardProps> = ({ onRegisterClick }) => {
  const navigate = useNavigate();
  const { setUserId } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(''); // Состояние для отображения ошибок

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    setFormSubmitted(true);

    if (!email.trim() || !password.trim()) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8081/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 401) {
        setError('Неверный email или пароль');
        setIsLoading(false);
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Ошибка при авторизации: ${errorData.message || response.statusText}`);
      }

      const data = await response.json();
      setUserId(data.userId);

      navigate('/profilepage');
    } catch (error) {
      setError('Не удалось войти. Пожалуйста, проверьте свои данные.');
      console.error('Ошибка при авторизации:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <h2>Авторизация:</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={formSubmitted && !email.trim() ? 'Поле не может быть пустым' : 'Введите вашу почту'}
        style={{ borderColor: formSubmitted && !email.trim() ? 'red' : 'initial' }}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={formSubmitted && !password.trim() ? 'Поле не может быть пустым' : 'Введите ваш пароль'}
        style={{ borderColor: formSubmitted && !password.trim() ? 'red' : 'initial' }}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Сообщение об ошибке */}
      {isLoading ? (
        <p>Загрузка...</p>
      ) : (
        <button onClick={handleLogin}>Войти!</button>
      )}
      <button onClick={onRegisterClick}>Еще не зарегистрированы?</button>
    </div>
  );
};

export default SignInCard;
