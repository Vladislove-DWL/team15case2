import ProfileButton from "../atoms/ProfileButton";
import Search from "../atoms/Search";

const DefaultHeader: React.FC = () => {

  return (
     <>
     <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        width: '100%',  // Задаем ширину контейнера
        padding: '10px' // Добавляем отступы, если нужно
      }}>
        <ProfileButton />
        <Search />
      </div>
      </>
  );
};

export default DefaultHeader;
