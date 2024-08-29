import React from 'react';

const ProfileHeader: React.FC = () => {
  return (
    <div style={styles.container}>
      <div style={styles.textContainer}>
        <h1 style={styles.text}>ПРОФИЛЬ IT-СПЕЦИАЛИСТА</h1>
      </div>
      <div style={styles.imageContainer}>
        <img
          src="../../src/assets/логоТ1.png" // Замените на реальный URL изображения
          alt="IT Specialist"
          style={styles.image}
        />
      </div>
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
    backgroundColor: '#f0f0f0', // Фон для всего компонента
  },
  textContainer: {
    flex: 1, // Занимает все доступное пространство, кроме отведенного под картинку
  },
  text: {
    fontSize: '70px',
    fontWeight: 'bold',
    margin: 0, // Убираем отступы
  },
  imageContainer: {
    flexShrink: 0, // Картинка не будет сжиматься
    marginLeft: '20px', // Отступ между текстом и картинкой
  },
  image: {
    maxWidth: '100%', // Заставляем картинку занимать максимум возможной ширины
    height: 'auto', // Сохраняем пропорции картинки
  },
};

export default ProfileHeader;