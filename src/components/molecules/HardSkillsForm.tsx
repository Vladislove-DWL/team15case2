import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

// Типы для данных
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

const HardSkillsForm: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);
  const [selectedSpecialization, setSelectedSpecialization] = useState<number | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<number>(0);

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

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log('Выбранная позиция:', selectedPosition);
    console.log('Выбранная специализация:', selectedSpecialization);
    console.log('Уровень компетенции:', selectedLevel);
    // Здесь можно отправить данные на сервер или обработать их другим образом
  };

  return (
    <form onSubmit={handleSubmit}>
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
        <label>Уровень компетенции:</label>
        <select value={selectedLevel} onChange={handleLevelChange}>
          {[...Array(10).keys()].map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Сохранить</button>
    </form>
  );
};

export default HardSkillsForm;
