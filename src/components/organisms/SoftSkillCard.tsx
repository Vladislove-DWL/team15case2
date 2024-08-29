import React, { useEffect, useState } from 'react';

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

const SoftSkillCard: React.FC = () => {
  const [softSkills, setSoftSkills] = useState<SoftSkill[]>([]);
  const [groupedSkills, setGroupedSkills] = useState<{ [key: string]: SoftSkill[] }>({});

  //ПОЧЕМУ 1 сразу стоит это надо брать из id
  useEffect(() => {
    const url = "http://localhost:8081/api/soft/1";
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error("Ошибка в запросе: " + response.status);
        }
        return response.json();
      })
      .then((data: SoftSkill[]) => {
        setSoftSkills(data);

        // Группировка по категориям
        const grouped = data.reduce((acc, skill) => {
          if (!acc[skill.categoryName]) {
            acc[skill.categoryName] = [];
          }
          acc[skill.categoryName].push(skill);
          return acc;
        }, {} as { [key: string]: SoftSkill[] });

        setGroupedSkills(grouped);
      })
      .catch(error => {
        console.error("Ошибка:", error); 
      });
  }, []);

  // Функция для обновления competencyLevel
  const updateCompetencyLevel = (softSkillId: number, workerId: number, newLevel: number) => {
    setSoftSkills(prevSkills => {
      const updatedSkills = prevSkills.map(skill => {
        if (skill.softSkillId === softSkillId) {
          return {
            ...skill,
            softGradeResponses: skill.softGradeResponses.map(response => {
              if (response.workerId === workerId) {
                const competencyLevelId = newLevel + 2; // Устанавливаем competencyLevelId в зависимости от newLevel
                const updatedResponse = {
                  ...response,
                  competencyLevel: newLevel,
                  competencyLevelId: competencyLevelId, // Устанавливаем корректный id
                };
                console.log(`Updated Response: `, updatedResponse); // Лог для отладки
                return updatedResponse;
              }
              return response;
            }),
          };
        }
        return skill;
      });

      // Лог для проверки обновленных значений
      console.log("Updated Soft Skills: ", updatedSkills);

      // Группировка по категориям
      const grouped = updatedSkills.reduce((acc, skill) => {
        if (!acc[skill.categoryName]) {
          acc[skill.categoryName] = [];
        }
        acc[skill.categoryName].push(skill);
        return acc;
      }, {} as { [key: string]: SoftSkill[] });

      setGroupedSkills(grouped);
      return updatedSkills;
    });
  };

  return (
    <div className="soft-skills-page">
      {Object.keys(groupedSkills).map(category => (
        <div key={category}>
          <h3>{category}</h3>
          <ul>
            {groupedSkills[category].map(skill => (
              <li key={skill.softSkillId}>
                <strong>{skill.competencyName}</strong>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div
                    style={{
                      borderRadius: '50%',
                      border: '1px solid #ccc',
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: '10px',
                    }}
                  >
                    {skill.softGradeResponses[0]?.competencyLevel || 0} {/* Начальное значение 0 */}
                  </div>
                  <select
                    value={skill.softGradeResponses[0]?.competencyLevel || 0} // Убедитесь, что начальное значение 0
                    onChange={(e) => {
                      const newLevel = parseInt(e.target.value);
                      updateCompetencyLevel(skill.softSkillId, skill.softGradeResponses[0]?.workerId, newLevel);
                    }}
                    style={{ marginLeft: '10px' }}
                  >
                    {/* Значения от -1 до 3 */}
                    {[...Array(5).keys()].map(i => (
                      <option key={i} value={i - 1}>{i - 1}</option>
                    ))}
                  </select>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SoftSkillCard;
