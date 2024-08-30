// import DefaultHeader from "../organisms/DefaultHeader";
import { useUser } from '../context/UserContext';
import ProfileButton from "../atoms/ProfileButton";
import SoftHeader from '../organisms/SoftHeader';

const UserHardPage: React.FC = () => {
  const {userId} = useUser()
    return (
      <div>
        <ProfileButton></ProfileButton>
        <SoftHeader></SoftHeader>
        <h1>Hard Skills</h1>
        <p>Эта страница еще в разработке</p>
        <p>Ваш уникальный идентификатор пользователя: {userId}</p>
      </div>
    );
  };
  
  export default UserHardPage;