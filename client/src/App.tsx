import { Route, Routes, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import './App.css';
import Login from './pages/Login';
import Layout from './layout/Layout';
import Home from './pages/Home';
import Chat from './pages/Chat';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './context/UserContext';
import { UserContextType } from './types/userContextType';
import { useCookies } from 'react-cookie';
import Settings from './pages/Settings';
import { ChatContextProvider } from './context/ChatContext';
import { PreferenceContextProvider } from './context/PreferenceContext';

function App() {
  const { currUser, setCurrUser } = useContext(UserContext) as UserContextType;
  const [authCookie] = useCookies(['AUTH']);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Access 'AUTH' cookie
    const authToken = authCookie.AUTH;

    // get user info from localStorage
    const user = localStorage.getItem('user');

    if (authToken && user) {
      setCurrUser(JSON.parse(user));
    }
    setIsLoading(false);
  }, [authCookie, setCurrUser]);

  if (isLoading) {
    return <></>;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {currUser ? (
          <>
            <Route
              index
              element={
                <PreferenceContextProvider>
                  <Home />
                </PreferenceContextProvider>
              }
            />
            <Route
              path="/chat"
              element={
                <ChatContextProvider>
                  <Chat />
                </ChatContextProvider>
              }
            />
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
