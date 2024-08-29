
import { useState } from 'react';
import SignUpCard from '../organisms/SignUpCard';
import SignInCard from '../organisms/SignInCard';

const AuthPage: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegisterClick = () => {
    setIsRegistering(true);
  };

  const handleLoginClick = () => {
    setIsRegistering(false);
  };

  return (
    <div>
        <h1>ПРОФИЛЬ IT-СПЕЦИАЛИСТА</h1>
      {isRegistering ? (
        <SignUpCard onLoginClick={handleLoginClick} />
      ) : (
        <SignInCard onRegisterClick={handleRegisterClick} />
      )}
    </div>
  );
};

export default AuthPage;