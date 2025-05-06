import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './Header';

const MainLayout = () => {
  const user = useSelector((state) => state.user);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
