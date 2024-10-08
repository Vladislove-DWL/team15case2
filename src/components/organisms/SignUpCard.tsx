import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import '../../index.css'

interface SignUpCardProps {
  onLoginClick: () => void;
}

const SignUpCard: React.FC<SignUpCardProps> = ({ onLoginClick }) => {
  const navigate = useNavigate();
  const { setUserId } = useUser();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateFields = () => {
    const errors: { [key: string]: string } = {};

    if (!firstName.trim()) errors.firstName = 'Поле должно быть заполнено';
    if (!lastName.trim()) errors.lastName = 'Поле должно быть заполнено';
    if (!middleName.trim()) errors.middleName = 'Поле должно быть заполнено';
    if (!birthday) errors.birthday = 'Поле должно быть заполнено';
    if (!city.trim()) errors.city = 'Поле должно быть заполнено';
    if (!phone.trim()) errors.phone = 'Поле должно быть заполнено';
    if (!email.trim()) errors.email = 'Поле должно быть заполнено';
    if (!password.trim()) errors.password = 'Поле должно быть заполнено';

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    if (formSubmitted) validateFields();
  }, [formSubmitted, firstName, lastName, middleName, birthday, city, phone, email, password]);

  const handleRegister = async () => {
    setFormSubmitted(true);
    setError('');
    setEmailError('');

    if (!validateFields()) return;
    if (!validateEmail(email)) {
      setEmailError('Неверный формат почты.');
      return;
    }

    const data = {
      firstName,
      lastName,
      middleName,
      birthday,
      city,
      phone,
      email,
      password,
    };

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8081/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status === 400) {
        setEmailError('Профиль с такой почтой уже существует.');
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Ошибка при регистрации: ${errorData.message || response.statusText}`);
      }

      const result = await response.json();
      setUserId(result.userId);
      navigate('/profilepage');
    } catch (error) {
      setError('Не удалось зарегистрироваться. Пожалуйста, проверьте свои данные.');
      console.error('Ошибка при регистрации:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="sign-up-card">
      <h2>Регистрация:</h2>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder={formSubmitted && fieldErrors.firstName ? fieldErrors.firstName : 'Имя'}
        className={formSubmitted && fieldErrors.firstName ? 'input-error' : ''}
      />
      
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder={formSubmitted && fieldErrors.lastName ? fieldErrors.lastName : 'Фамилия'}
        className={formSubmitted && fieldErrors.lastName ? 'input-error' : ''}
      />
      
      <input
        type="text"
        value={middleName}
        onChange={(e) => setMiddleName(e.target.value)}
        placeholder={formSubmitted && fieldErrors.middleName ? fieldErrors.middleName : 'Отчество'}
        className={formSubmitted && fieldErrors.middleName ? 'input-error' : ''}
      />
      
      <input
        type="date"
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
        className={formSubmitted && fieldErrors.birthday ? 'input-error' : ''}
      />
      
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder={formSubmitted && fieldErrors.city ? fieldErrors.city : 'Город'}
        className={formSubmitted && fieldErrors.city ? 'input-error' : ''}
      />
      
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder={formSubmitted && fieldErrors.phone ? fieldErrors.phone : 'Телефон'}
        className={formSubmitted && fieldErrors.phone ? 'input-error' : ''}
      />
      
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setEmailError(''); 
        }}
        placeholder={formSubmitted && (emailError || fieldErrors.email) ? emailError || fieldErrors.email : 'Электронная почта'}
        className={formSubmitted && (emailError || fieldErrors.email) ? 'input-error' : ''}
      />
      {emailError && <p className="error-message">{emailError}</p>}
      
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={formSubmitted && fieldErrors.password ? fieldErrors.password : 'Пароль'}
        className={formSubmitted && fieldErrors.password ? 'input-error' : ''}
      />
      
      {error && <p className="error-message">{error}</p>}
      {isLoading ? (
        <p>Загрузка...</p>
      ) : (
        <button onClick={handleRegister}>
          Зарегистрироваться!
        </button>
      )}
      <button onClick={onLoginClick}>Уже зарегистрировались?</button>
    </div>
  );
};

export default SignUpCard;
