import { useDispatch } from 'react-redux';
import { updateTask, deleteTask } from '../store/slices/tasksSlice';
import { useSendSocketEvent } from '../hooks/useSocket';

export default function TaskCard({ task }) {
  const dispatch = useDispatch();
  const sendSocketEvent = useSendSocketEvent();

  const handleStatusChange = (newStatus) => {
    dispatch(updateTask({ id: task._id, status: newStatus }));
    sendSocketEvent('task:update', { id: task._id, status: newStatus });
  };

  const handleDelete = () => {
    if (window.confirm('Delete this task?')) {
      dispatch(deleteTask(task._id));
      sendSocketEvent('task:delete', task._id);
    }
  };

  const priorityColors = {
    low: 'bg-blue-100 text-blue-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  const statusColors = {
    todo: 'bg-gray-100',
    'in-progress': 'bg-blue-100',
    done: 'bg-green-100',
  };

  return (
    <div className={`p-4 border border-gray-200 rounded-lg ${statusColors[task.status]}`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold">{task.title}</h3>
        <span className={`px-2 py-1 rounded text-xs font-semibold ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="text-gray-600 mb-3">{task.description}</p>
      )}

      <div className="flex gap-2 mb-3">
        <select
          value={task.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="px-2 py-1 border border-gray-300 rounded text-sm"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <button
          onClick={handleDelete}
          className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
        >
          Delete
        </button>
      </div>

      {task.dueDate && (
        <p className="text-sm text-gray-500">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}

      {task.assignedTo && (
        <p className="text-sm text-gray-500">
          Assigned to: {task.assignedTo.name}
        </p>
      )}

      {task.tags && task.tags.length > 0 && (
        <div className="flex gap-1 mt-2">
          {task.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-gray-300 text-gray-700 rounded text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}