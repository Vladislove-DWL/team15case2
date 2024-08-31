import ProfileButton from "../atoms/ProfileButton";
import Search from "../atoms/Search";
import '../../index.css'

const DefaultHeader: React.FC = () => {
  return (
    <div className="default-header">
      <ProfileButton />
      <Search />
    </div>
  );
};

export default DefaultHeader;