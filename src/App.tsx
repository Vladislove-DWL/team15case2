import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './components/pages/AuthPage';
import ProfilePage from './components/pages/ProfilePage';
import UserInfoPage from './components/pages/UserInfoPage';
import UserHardPage from './components/pages/UserHardPage';
import UserSoftPage from './components/pages/UserSoftPage';
import NotFoundPage from './components/pages/NotFoundPage';

import { UserProvider } from './components/context/UserContext';
import { SelectedUserProvider } from './components/context/SelectedUserContext';

const App: React.FC = () => {
  return (
    <UserProvider>
      <SelectedUserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/authpage" element={<AuthPage />} />
            <Route path="/profilepage" element={<ProfilePage />} />
            <Route path="/userinfopage/:userId" element={<UserInfoPage />} /> 
            <Route path="/userhardpage" element={<UserHardPage />} />
            <Route path="/usersoftpage/:userId" element={<UserSoftPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </SelectedUserProvider>
    </UserProvider>
  );
};

export default App;