import ProfileButton from '../atoms/ProfileButton';
import Search from '../atoms/Search';
import '../../index.css'

const ProfilePageSection: React.FC = () => {
  return (
    <div className="profile-page-section">
      <ProfileButton />
      <Search />
    </div>
  );
};

export default ProfilePageSection;