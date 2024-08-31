import { useNavigate } from 'react-router-dom';
import '../../index.css'

const UserHardCard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/userhardpage');
  };

  return (
    <div className="user-hard-card">
      <h1>Hard Skills</h1>
      <h2>
        Хард-скиллы (hard skills) — это конкретные, измеримые навыки и знания, которые можно легко определить
        и оценить. Они включают в себя технические умения, профессиональные компетенции и специализированные знания,
        необходимые для выполнения определённых задач в различных областях. Хард-скиллы могут быть получены через
        формальное образование, курсы, тренинги и практический опыт.
      </h2>
      <button onClick={handleLogin}>Посмотреть</button>
    </div>
  );
};

export default UserHardCard;
