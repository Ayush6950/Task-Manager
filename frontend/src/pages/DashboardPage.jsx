import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useSocket } from '../hooks/useSocket.jsx';
import TaskList from '../components/TaskList.jsx';
import TaskForm from '../components/TaskForm.jsx';
import Navbar from '../components/Navbar.jsx';

export default function DashboardPage() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  useSocket(); // Setup real-time connection

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Welcome, {user.name}!</h1>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TaskList />
          </div>

          <div className="lg:col-span-1">
            <TaskForm />
          </div>
        </div>
      </main>
    </div>
  );
}