    import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../store/slices/tasksSlice';
import { useSendSocketEvent } from '../hooks/useSocket';

export default function TaskForm({ onTaskCreated }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    tags: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const sendSocketEvent = useSendSocketEvent();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const taskData = {
        ...formData,
        tags: formData.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      };

      const result = await dispatch(createTask(taskData));
      sendSocketEvent('task:create', taskData);

      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '',
        tags: '',
      });

      if (onTaskCreated) onTaskCreated(result);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 border border-gray-300 rounded-lg"
    >
      <h3 className="text-lg font-semibold mb-4">Create New Task</h3>

      <input
        type="text"
        name="title"
        placeholder="Task title"
        value={formData.title}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 mb-3 border border-gray-300 rounded"
      />

      <textarea
        name="description"
        placeholder="Description (optional)"
        value={formData.description}
        onChange={handleChange}
        rows="3"
        className="w-full px-4 py-2 mb-3 border border-gray-300 rounded"
      />

      <div className="grid grid-cols-2 gap-3 mb-3">
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded"
        />
      </div>

      <input
        type="text"
        name="tags"
        placeholder="Tags (comma-separated, optional)"
        value={formData.tags}
        onChange={handleChange}
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
      />

      <button
        type="submit"
        disabled={isLoading || !formData.title}
        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:opacity-50"
      >
        {isLoading ? 'Creating...' : 'Create Task'}
      </button>
    </form>
  );
}