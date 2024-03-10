import { Route, Routes, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import './App.css';
import Login from './pages/Login';
import Layout from './layout/Layout';
import Home from './pages/Home';
import Chat from './pages/Chat';
import { useContext, useEffect } from 'react';
import { UserContext } from './context/UserContext';
import { UserContextType } from './types/userContextType';
import { useCookies } from 'react-cookie';
import Settings from './pages/Settings';

function App() {
  const { currUser, setCurrUser } = useContext(UserContext) as UserContextType;
  const [authCookie] = useCookies(['AUTH']);

  useEffect(() => {
    // Access 'AUTH' cookie
    const authToken = authCookie.AUTH;

    // get user info from localStorage
    const user = localStorage.getItem('user');

    if (authToken && user) {
      setCurrUser(JSON.parse(user));
    }
  }, [authCookie, setCurrUser]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {authCookie && currUser ? (
          <>
            <Route index element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/settings" element={<Settings />} />
          </>
        ) : (
          <>
            <Route index element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        )}
        {/* Add a fallback route to handle cases where no routes match */}
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

export default App;
