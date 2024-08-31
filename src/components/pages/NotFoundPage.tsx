import { Link } from 'react-router-dom';
import '../../index.css'

const NotFoundPage: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <img src="../../src/assets/404.png" alt="" />
      <h1>404 - Страница не найдена</h1>
      <p>К сожалению, страница, которую вы ищете, не существует.</p>
      <Link to="/">Вернуться на главную</Link>
    </div>
  );
};

export default NotFoundPage;