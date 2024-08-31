import '../../index.css'

const ProfileHeader: React.FC = () => {
  return (
    <div className="profile-header">
      <div className="text-container">
        <h1 className="header-text">ПРОФИЛЬ IT-СПЕЦИАЛИСТА</h1>
      </div>
      <div className="image-container">
        <img
          src="../../src/assets/logo.png" 
          alt="IT Specialist"
          className="header-image"
        />
      </div>
    </div>
  );
};

export default ProfileHeader;
