import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { NotFound } from '../components/NotFound';
import { LayoutHome } from '../layouts/LayoutHome';
import { HomePage } from '../pages/home/HomePage';
import { UserPage } from '../pages/user/UserPage';
import { ConfigurationProfile } from '../pages/user/ConfigurationProfile';
import { useAuthStore } from '../hooks/useAuthStore';
import { Loading } from '../components/Loading';
import { Auth } from '../components/Auth';
import { GroupPage } from '../pages/group/GroupPage';
import { GroupPageContent } from '../pages/group/GroupPageContent';

import { useGroupsStore } from '../hooks/useGroupsStore';

import { UserPageVisit } from '../pages/user/UserPageVisit';
import { useSocket } from '../hooks/useSocket';
import { useDispatch } from 'react-redux';
import { setSokect } from '../store/socket';

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();
  const { getAllPublications, getProfilePublicatios, getGroups } =
    useGroupsStore();

  const dispatch = useDispatch();

  const { socket, online } = useSocket('http://localhost:8080');

  dispatch(setSokect(socket));

  useEffect(() => {
    checkAuthToken();
  }, []);

  useEffect(() => {
    if (status === 'authenticated') {
      const hasReloaded = localStorage.getItem('hasReloaded');
      if (!hasReloaded) {
        localStorage.setItem('hasReloaded', 'true');
        window.location.reload();
      }

      getAllPublications();
      getProfilePublicatios();
      getGroups();

      socket.connect();
    } else {
      socket.disconnect();
    }
  }, [status, socket]);

  if (status === 'checking') {
    return <Loading />;
  }

  return (
    <Routes>
      {status === 'not-authenticated' ? (
        <>
          <Route path="/auth/*" element={<Auth />} />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </>
      ) : (
        <>
          <Route path="/*" element={<Navigate to="/home" />} />

          <Route element={<LayoutHome />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile" element={<UserPage />} />
            <Route path="/profile/:id" element={<UserPageVisit />} />
            <Route path="/configuration" element={<ConfigurationProfile />} />
            <Route path="/groups" element={<GroupPage />} />
            <Route path="/group/:id" element={<GroupPageContent />} />
          </Route>
        </>
      )}
    </Routes>
  );
};
