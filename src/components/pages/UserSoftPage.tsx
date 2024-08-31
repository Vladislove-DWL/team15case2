// Импортируем необходимые библиотеки и контексты
import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { useParams } from 'react-router-dom';
// import DefaultHeader from '../organisms/DefaultHeader';
import ProfileButton from '../atoms/ProfileButton';
import SoftHeader from '../organisms/SoftHeader';
import SoftLegend from '../atoms/SoftLegend';
// import './UserSoftPage.css'; // Импортируем стили

// Определяем интерфейсы для типов данных
interface SoftGradeResponse {
  workerId: number;
  competencyLevel: number;
  competencyLevelId: number;
}

interface SoftSkill {
  softSkillId: number;
  competencyName: string;
  categoryName: string;
  softGradeResponses: SoftGradeResponse[];
}

const UserSoftPage: React.FC = () => {
  const { userId: paramUserId } = useParams<{ userId: string }>();
  const { userId } = useUser();
  const [softSkills, setSoftSkills] = useState<SoftSkill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<{ [key: number]: boolean }>({});
  const [thirdCircleRatings, setThirdCircleRatings] = useState<{ [key: number]: number | null }>({});

  const isOwnPage = !paramUserId || Number(paramUserId) === userId;

  useEffect(() => {
    const fetchSoftSkills = async () => {
      const fetchUserId = paramUserId ? Number(paramUserId) : userId;

      try {
        const response = await fetch(`http://10.4.56.61:8081/api/soft/${fetchUserId}`);
        
        if (!response.ok) {
          if (response.status === 404 && paramUserId) {
            const fallbackResponse = await fetch(`http://10.4.56.61:8081/api/soft/${userId}`);
            if (!fallbackResponse.ok) {
              throw new Error(`Ошибка: ${fallbackResponse.status}`);
            }
            const fallbackData: SoftSkill[] = await fallbackResponse.json();
            setSoftSkills(fallbackData);
          } else {
            throw new Error(`Ошибка: ${response.status}`);
          }
        } else {
          const data: SoftSkill[] = await response.json();
          setSoftSkills(data);
          const initialThirdCircleRatings: { [key: number]: number | null } = {};
          data.forEach(skill => {
            const userResponse = skill.softGradeResponses.find(response => response.workerId === userId);
            initialThirdCircleRatings[skill.softSkillId] = userResponse ? userResponse.competencyLevel : null;
          });
          setThirdCircleRatings(initialThirdCircleRatings);
        }
      } catch (error) {
        setError('Ошибка при загрузке софт-навыков.');
        console.error('Ошибка:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSoftSkills();
  }, [paramUserId, userId]);

  const handleRatingChange = (softSkillId: number, newRating: number) => {
    setSoftSkills(prev => 
      prev.map(skill => {
        if (skill.softSkillId === softSkillId) {
          const updatedResponses = skill.softGradeResponses.map(response => {
            if (response.workerId === userId) {
              return { ...response, competencyLevel: newRating, competencyLevelId: newRating + 2 };
            }
            return response;
          });
          return { ...skill, softGradeResponses: updatedResponses };
        }
        return skill;
      })
    );
  };

  const handleSaveRatings = async () => {
    for (const skill of softSkills) {
      const response = skill.softGradeResponses.find(response => response.workerId === userId);
      if (response) {
        const requestBody = {
          softSkillId: skill.softSkillId,
          workerId: userId,
          competencyLevelId: response.competencyLevelId,
        };

        try {
          const res = await fetch('http://10.4.56.61:8081/api/soft', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
          });

          if (!res.ok) {
            throw new Error(`Ошибка при сохранении: ${res.status}`);
          }
        } catch (error) {
          console.error('Ошибка при сохранении оценок:', error);
        }
      }

      // Сохранение оценок для третьего кружка
      if (!isOwnPage && thirdCircleRatings[skill.softSkillId] !== null) {
        const rating = thirdCircleRatings[skill.softSkillId]!;
        const requestBody = {
          softSkillId: skill.softSkillId,
          workerId: userId,
          competencyLevelId: rating + 2,
        };

        const method = skill.softGradeResponses.find(response => response.workerId === userId) ? 'PUT' : 'POST';

        try {
          const res = await fetch('http://10.4.56.61:8081/api/soft', {
            method: method,
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
          });

          if (!res.ok) {
            throw new Error(`Ошибка при сохранении третьего кружка: ${res.status}`);
          }
        } catch (error) {
          console.error('Ошибка при сохранении третьего кружка:', error);
        }
      }
    }
    alert('Оценки успешно сохранены!');
  };

  const toggleDropdown = (softSkillId: number) => {
    setOpenDropdown(prev => ({ ...prev, [softSkillId]: !prev[softSkillId] }));
  };

  const closeDropdown = () => {
    setOpenDropdown({});
  };

  const calculateAverageRating = (responses: SoftGradeResponse[]): number => {
    const total = responses.reduce((acc, curr) => acc + curr.competencyLevel, 0);
    return total / responses.length;
  };

  const handleThirdCircleChange = (softSkillId: number, newRating: number) => {
    setThirdCircleRatings(prev => ({
      ...prev,
      [softSkillId]: newRating,
    }));
    closeDropdown();
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;
  if (softSkills.length === 0) return <div>Нет данных для отображения.</div>;

  const groupedByCategory: { [key: string]: SoftSkill[] } = softSkills.reduce((acc, skill) => {
    const category = skill.categoryName;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as { [key: string]: SoftSkill[] });

  // Преобразуем категории в массив, чтобы разбить на 4 колонки
  const categories = Object.entries(groupedByCategory);
  const columnCount = 4;
  const columns: JSX.Element[][] = Array.from({ length: columnCount }, () => []);

  categories.forEach(([category, skills], index) => {
    columns[index % columnCount].push(
      <div  key={category}>
        <h2 style={{  backgroundColor: '#00A4DC', color: 'white' }}>{category}</h2>
        {skills.map(skill => {
          const currentResponse = skill.softGradeResponses.find(response => response.workerId === (isOwnPage ? userId : Number(paramUserId)));
          const currentRating = currentResponse ? currentResponse.competencyLevel : null;
          const averageRating = calculateAverageRating(skill.softGradeResponses);
          const thirdCircleRating = thirdCircleRatings[skill.softSkillId];

          return (
            <div key={skill.softSkillId} style={{ margin: '20px', border: '5px gray solid', padding: '10px'  }}>
              {/* Используем flex для выравнивания в одну строку */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'lightblue',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '10px',
                    cursor: isOwnPage ? 'pointer' : 'default'
                  }}
                  onClick={isOwnPage ? () => toggleDropdown(skill.softSkillId) : undefined}
                >
                  {currentRating}
                </div>
                <span style={{ marginRight: '10px' }}>{skill.competencyName}</span>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'lightgreen',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: '20px',
                  }}
                >
                  {averageRating.toFixed(2)}
                </div>
                {!isOwnPage && (
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: thirdCircleRating !== null ? 'lightcoral' : 'lightgray',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginLeft: '20px',
                      cursor: 'pointer',
                    }}
                    onClick={() => toggleDropdown(skill.softSkillId)}
                  >
                    {thirdCircleRating !== null ? thirdCircleRating : '+'}
                  </div>
                )}
                {/* Здесь также обработка дропдаунов для оценок */}
                {openDropdown[skill.softSkillId] && isOwnPage && (
                  <div style={{ position: 'absolute', backgroundColor: 'white', border: '1px solid gray', borderRadius: '4px', marginTop: '10px' }}>
                    {[-1, 0, 1, 2, 3].map(level => (
                      <div
                        key={level}
                        style={{ padding: '5px', cursor: 'pointer' }}
                        onClick={() => {
                          handleRatingChange(skill.softSkillId, level);
                          closeDropdown();
                        }}
                      >
                        Оценка: {level}
                      </div>
                    ))}
                  </div>
                )}
                {openDropdown[skill.softSkillId] && !isOwnPage && (
                  <div style={{ position: 'absolute', backgroundColor: 'white', border: '1px solid gray', borderRadius: '4px', marginTop: '10px' }}>
                    {[-1, 0, 1, 2, 3].map(level => (
                      <div
                        key={level}
                        style={{ padding: '5px', cursor: 'pointer' }}
                        onClick={() => handleThirdCircleChange(skill.softSkillId, level)}
                      >
                        Оценка: {level}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  });

  return (

    <div>
        <ProfileButton></ProfileButton>
      <h1>Soft Skills</h1>
      <SoftHeader></SoftHeader>
      <button onClick={handleSaveRatings}>Сохранить все изменения</button>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {columns.map((column, index) => (
          <div key={index} style={{ flex: 1, margin: '0 10px' }}>
            {column}
          </div>
        ))}
      </div>
      <SoftLegend></SoftLegend>
    </div>
  );
};

export default UserSoftPage;