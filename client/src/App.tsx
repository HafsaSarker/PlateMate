import { Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import './App.css';
import Login from './pages/Login';
import Layout from './layout/Layout';
import Homepage from './pages/Homepage';
import Chat from './pages/Chat';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/chat" element={<Chat />} />
      </Route>
    </Routes>
  );
}

export default App;
