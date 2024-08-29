import ProfileButton from "../atoms/ProfileButton";
import Search from "../atoms/Search";

const DefaultHeader: React.FC = () => {

  return (
     <>
     <div>
        <ProfileButton></ProfileButton>
        <Search></Search>
      </div>
      </>
  );
};

export default DefaultHeader;