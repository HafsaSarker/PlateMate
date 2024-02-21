import { Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import './App.css';
import Login from './pages/Login';
import Layout from './layout/Layout';
import Home from './pages/Home';
import Chat from './pages/Chat';
import { useContext, useEffect } from 'react';
import { UserContext } from './context/UserContext';
import { UserContextType } from './types/userContextType';

function App() {
  const { currUser, setCurrUser } = useContext(UserContext) as UserContextType;

  useEffect(() => {
    const userExist = localStorage.getItem('user');
    if (userExist && !currUser) {
      setCurrUser(JSON.parse(userExist));
    }
  }, [currUser]);

  return (
    <Routes>
      {currUser ? (
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/chat" element={<Chat />} />
        </Route>
      ) : (
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      )}
    </Routes>
  );
}

export default App;
