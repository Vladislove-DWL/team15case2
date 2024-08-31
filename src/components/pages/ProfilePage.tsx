import React from 'react';
import { useLocation } from 'react-router-dom';
import UserInfoCard from '../organisms/UserInfoCard';
import UserHardCard from '../organisms/UserHardCard';
import UserSoft from '../organisms/UserSoftCard';
import { useUser } from '../context/UserContext';
import ProfilePageHeader from '../organisms/ProfilePageHeader';
import ProfilePageSection from '../organisms/ProfilePageSection';

const ProfilePage: React.FC = () => {
  const location = useLocation();
  const { userId } = useUser(); 

  const { selectedPersonId } = location.state || {}; 

  if (userId === null) {
    return <h2>Пользователь не авторизован. Пожалуйста, войдите в систему.</h2>;
  }



  return (
    <div>
      <ProfilePageHeader></ProfilePageHeader>
      <ProfilePageSection></ProfilePageSection>
      <UserInfoCard  /> 
      <UserSoft />
      <UserHardCard />
    </div>
  );
};

export default ProfilePage;