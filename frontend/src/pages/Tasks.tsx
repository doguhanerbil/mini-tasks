import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearToken } from '../api/client';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  type TaskResponse,
} from '../api/tasks';

/**
 * Tasks page – demonstrates full CRUD against the backend.
 * Protected: only accessible with a valid JWT.
 */
export default function Tasks() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // New-task form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Inline-edit state (null = not editing)
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  // Fetch tasks on mount
  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    setLoading(true);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }

  // ── Create ────────────────────────────────────────────────
  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    setError('');
    try {
      const newTask = await createTask({ title, description });
      setTasks((prev) => [...prev, newTask]);
      setTitle('');
      setDescription('');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to create task');
    }
  }

  // ── Toggle completed ─────────────────────────────────────
  async function handleToggleCompleted(task: TaskResponse) {
    setError('');
    try {
      const updated = await updateTask(task.id, {
        completed: !task.completed,
      });
      setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
    }
  }

  // ── Inline edit ───────────────────────────────────────────
  function startEditing(task: TaskResponse) {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description ?? '');
  }

  function cancelEditing() {
    setEditingId(null);
  }

  async function handleSaveEdit(task: TaskResponse) {
    setError('');
    try {
      const updated = await updateTask(task.id, {
        title: editTitle,
        description: editDescription,
      });
      setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
      setEditingId(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
    }
  }

  // ── Delete ────────────────────────────────────────────────
  async function handleDelete(id: number) {
    setError('');
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to delete task');
    }
  }

  // ── Logout ────────────────────────────────────────────────
  function handleLogout() {
    clearToken();
    navigate('/login');
  }

  return (
    <div className="tasks-page">
      <header className="tasks-header">
        <h1>My Tasks</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>

      {error && <p className="error">{error}</p>}

      {/* ── Create task form ─────────────────────────────────── */}
      <form className="create-form" onSubmit={handleCreate}>
        <h2>New Task</h2>
        <label>
          Title
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Description
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <button type="submit">Add Task</button>
      </form>

      {/* ── Task list ────────────────────────────────────────── */}
      {loading ? (
        <p>Loading…</p>
      ) : tasks.length === 0 ? (
        <p>No tasks yet. Create one above.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className={task.completed ? 'completed' : ''}>
              {editingId === task.id ? (
                /* ── Editing mode ─────────────────────────────── */
                <div className="task-edit">
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    required
                  />
                  <input
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                  <div className="task-actions">
                    <button onClick={() => handleSaveEdit(task)}>Save</button>
                    <button onClick={cancelEditing}>Cancel</button>
                  </div>
                </div>
              ) : (
                /* ── Display mode ─────────────────────────────── */
                <div className="task-item">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleCompleted(task)}
                    title="Toggle completed"
                  />
                  <div className="task-info">
                    <strong>{task.title}</strong>
                    {task.description && <p>{task.description}</p>}
                    <small>
                      Created: {new Date(task.createdAt).toLocaleString()} |
                      Updated: {new Date(task.updatedAt).toLocaleString()}
                    </small>
                  </div>
                  <div className="task-actions">
                    <button onClick={() => startEditing(task)}>Edit</button>
                    <button onClick={() => handleDelete(task.id)}>Delete</button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
