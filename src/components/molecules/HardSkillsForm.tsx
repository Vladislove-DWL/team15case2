import { useState, useEffect, ChangeEvent} from 'react';

interface Position {
  positionId: number;
  positionName: string;
}

interface Specialization {
  specializationId: number;
  specializationName: string;
}

interface Role {
  roleName: string;
  specializations: Specialization[];
}

interface HardSkillsData {
  positions: Position[];
  roles: Role[];
}

interface HardSkill {
  hardSkillId: number;
  competencyName: string;
  categoryName: string;
  hardGradeResponses: any[];
}

interface ProfileData {
  tShapeProfileId: number;
  position: Position;
  isCurrent: boolean;
  freeHours: number;
  roleName: string;
  specializationName: string;
  hardSkills: HardSkill[];
}

const HardSkillsForm: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);
  const [selectedSpecialization, setSelectedSpecialization] = useState<number | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<number>(0);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/hard', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data: HardSkillsData = await response.json();
        setPositions(data.positions);
        setRoles(data.roles);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    fetchData();
  }, []);

  const handlePositionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const positionId = Number(event.target.value);
    setSelectedPosition(positionId);
  };

  const handleSpecializationChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const specializationId = Number(event.target.value);
    setSelectedSpecialization(specializationId);
  };

  const handleLevelChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const level = Number(event.target.value);
    setSelectedLevel(level);
  };

  const handlePost = async () => {
    console.log('handlePost вызван');
    console.log('Выбранная позиция:', selectedPosition);
    console.log('Выбранная специализация:', selectedSpecialization);
    console.log('Уровень компетенции:', selectedLevel);

    if (selectedPosition !== null && selectedSpecialization !== null) {
      const payload = {
        positionId: selectedPosition,
        specializationId: selectedSpecialization,
        freeHours: selectedLevel,
      };

      console.log('Payload:', payload);

      try {
        const response = await fetch(`http://localhost:8081/api/hard/${selectedPosition}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        const responseData = await response.json();
        console.log('Ответ от сервера:', responseData);

        if (response.ok) {
          console.log('Данные успешно отправлены');
          setSelectedLevel(0);
        } else {
          console.error('Ошибка при отправке данных', responseData);
        }
      } catch (error) {
        console.error('Ошибка:', error);
      }
    } else {
      console.error('Пожалуйста, выберите позицию и специализацию');
    }
  };

  const handleCreateProfile = async () => {
    if (selectedPosition !== null) {
      try {
        const response = await fetch(`http://localhost:8081/api/hard/${selectedPosition}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data: ProfileData = await response.json();
          setProfileData(data);
          setError(null);
        } else {
          setError('Ошибка при получении профиля');
        }
      } catch (error) {
        console.error('Ошибка:', error);
        setError('Ошибка при получении профиля');
      }
    } else {
      setError('Пожалуйста, выберите позицию перед созданием профиля');
    }
  };

  const renderProfileData = () => {
    if (!profileData || !profileData.hardSkills || !Array.isArray(profileData.hardSkills)) return null;
  
    const categoriesMap: Record<string, HardSkill[]> = {};
    profileData.hardSkills.forEach(skill => {
      if (!categoriesMap[skill.categoryName]) {
        categoriesMap[skill.categoryName] = [];
      }
      categoriesMap[skill.categoryName].push(skill);
    });
  
    const maxCategory = Object.keys(categoriesMap).reduce((prev, current) => {
      return categoriesMap[prev].length > categoriesMap[current].length ? prev : current;
    });
  
    return (
      <div className="profile-data">
        <div className="categories">
          {Object.keys(categoriesMap).map(category => (
            <div key={category} className={`category ${category === maxCategory ? 'max-category' : ''}`}>
              <h3>{category} ({categoriesMap[category].length})</h3>
              <ul>
                {categoriesMap[category].map(skill => (
                  <li key={skill.hardSkillId}>{skill.competencyName}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <form onSubmit={(event) => { event.preventDefault(); handlePost(); }}>
      <div>
        <label>Позиция:</label>
        <select value={selectedPosition ?? ''} onChange={handlePositionChange}>
          <option value="" disabled>Выберите позицию</option>
          {positions.map((position) => (
            <option key={position.positionId} value={position.positionId}>
              {position.positionName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Роль и специализация:</label>
        <select value={selectedSpecialization ?? ''} onChange={handleSpecializationChange}>
          <option value="" disabled>Выберите специализацию</option>
          {roles.map((role) => (
            <optgroup key={role.roleName} label={role.roleName}>
              {role.specializations.map((specialization) => (
                <option key={specialization.specializationId} value={specialization.specializationId}>
                  {specialization.specializationName}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      <div>
        <label>Количество свободного времени:</label>
        <select value={selectedLevel} onChange={handleLevelChange}>
          {[...Array(10).keys()].map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Отправить POST-запрос</button>
      <button type="button" onClick={handleCreateProfile}>Создать профиль</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {renderProfileData()}
    </form>
  );
};

export default HardSkillsForm;
