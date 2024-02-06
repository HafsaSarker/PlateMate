import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div>
      {/* NAV HERE */}
      <div className="h-screen w-screen flex items-start justify-start bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
}
