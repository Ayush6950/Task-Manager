
  import { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { useAuth } from '../hooks/useAuth';

  export default function AuthForm({ mode = 'login' }) {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const { login, register, error } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);

      try {
        if (mode === 'login') {
          await login(formData.email, formData.password);
        } else {
          await register(formData.name, formData.email, formData.password);
        }
        navigate('/dashboard');
      } catch (err) {
        console.error('Auth error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg">
        <h2 className="text-2xl font-bold mb-6">
          {mode === 'login' ? 'Login' : 'Sign Up'}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <input
              type="text"
              name="name"
              placeholder="Full name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded"
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? 'Loading...' : mode === 'login' ? 'Login' : 'Sign Up'}
        </button>
      </form>

      <p className="mt-4 text-center text-gray-600">
        {mode === 'login' ? "Don't have account? " : 'Already have account? '}
        <a href={mode === 'login' ? '/register' : '/login'} className="text-blue-500">
          {mode === 'login' ? 'Sign Up' : 'Login'}
        </a>
      </p>
    </div>
  );
}