import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../Store/slices/tasksSlice.jsx';
import TaskCard from './TaskCard.jsx';

export default function TaskList() {
  const dispatch = useDispatch();
  const { items: tasks, loading, pagination } = useSelector(
    (state) => state.tasks
  );
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
  });

  useEffect(() => {
    dispatch(fetchTasks(filters));
  }, [filters, dispatch]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value || undefined,
    }));
  };

  if (loading) {
    return <div className="text-center py-8">Loading tasks...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-4 mb-6">
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="px-4 py-2 border border-gray-300 rounded"
        >
          <option value="">All Status</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <select
          name="priority"
          value={filters.priority}
          onChange={handleFilterChange}
          className="px-4 py-2 border border-gray-300 rounded"
        >
          <option value="">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="grid gap-4">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks found</p>
        ) : (
          tasks.map((task) => <TaskCard key={task._id} task={task} />)
        )}
      </div>

      {pagination.pages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() =>
                  dispatch(fetchTasks({ ...filters, page }))
                }
                className={`px-3 py-1 border rounded ${
                  pagination.page === page
                    ? 'bg-blue-500 text-white'
                    : 'border-gray-300'
                }`}
              >
                {page}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}