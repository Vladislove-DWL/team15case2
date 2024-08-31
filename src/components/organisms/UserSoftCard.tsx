import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useSelectedUser } from '../context/SelectedUserContext';
import '../../index.css'

const UserSoftCard: React.FC = () => {
  const { userId } = useUser();
  const { selectedUser } = useSelectedUser(); 
  const navigate = useNavigate();

  const personIdToDisplay = selectedUser ? selectedUser.id : userId;

  const handleViewSoftSkills = () => {
    navigate(`/usersoftpage/${personIdToDisplay}`);
  };

  return (
    <div className="user-soft-card">
      <h1>Soft Skills</h1>
      <h2>
        Софт-скиллы (soft skills) — это личностные качества, навыки общения и поведения,
        которые помогают эффективно взаимодействовать с другими людьми и адаптироваться к различным ситуациям.
        В отличие от хард-скиллов (hard skills), которые включают технические знания и профессиональные
        компетенции, софт-скиллы касаются вашего поведения, отношения к работе и способностей в общении.
      </h2>
      <button onClick={handleViewSoftSkills}>Посмотреть</button>
    </div>
  );
};

export default UserSoftCard;