import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Dashboard from './Dashboard';

const DashboardLayout = () => {
  const user = useSelector((state) => state.user);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <Dashboard />
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
