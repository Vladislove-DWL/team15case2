import DefaultHeader from "../organisms/DefaultHeader";
import { useUser } from '../context/UserContext';

const UserHardPage: React.FC = () => {
  const {userId} = useUser()
    return (
      <div>
        <DefaultHeader></DefaultHeader>
        <h1>Редактирование хардов пользователя</h1>
        <p>Ваш уникальный идентификатор пользователя: {userId}</p>
      </div>
    );
  };
  
  export default UserHardPage;