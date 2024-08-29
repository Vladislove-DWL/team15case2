import { useNavigate } from 'react-router-dom';

const UserHardCard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/userhardpage');
  };

  return (
    <div style={{ background: '#00A4DC', padding: '20px', borderRadius: '5px', margin: '20px', color: 'white' }}>
      <h1>Hard Skills</h1>
      <h2>Хард-скиллы (hard skills) — это конкретные, измеримые навыки и знания, которые можно легко определить
        и оценить. Они включают в себя технические умения, профессиональные компетенции и специализированные знания,
        необходимые для выполнения определённых задач в различных областях.
        Хард-скиллы могут быть получены через формальное образование, курсы, тренинги и практический опыт.
      </h2>
      <button onClick={handleLogin}>Посмотреть</button>
    </div>
  );
};

export default UserHardCard;