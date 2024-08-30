import React from 'react';
import ProfileButton from '../atoms/ProfileButton';
import Search from '../atoms/Search';

const ProfilePageSection: React.FC = () => {
  return (
    <div style={styles.container}>
      <ProfileButton />
      <Search />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '20px',
    backgroundColor: 'black',
  },
};

export default ProfilePageSection;