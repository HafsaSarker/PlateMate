import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';

export default function Layout() {
  return (
    <div>
      <div className="h-screen w-screen flex flex-col items-start justify-start bg-gray-50">
        <div className="w-screen">
          <Navbar />
        </div>
        <Outlet />
      </div>
    </div>
  );
}
