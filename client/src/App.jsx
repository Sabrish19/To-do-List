import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

axios.defaults.withCredentials = true;

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [user, setUser] = useState(null);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editText, setEditText] = useState('');
  const [editAssignee, setEditAssignee] = useState('');
  const [status, setStatus] = useState('in progress');
  const [assignee, setAssignee] = useState('');
  const [filter, setFilter] = useState('all');
  const [toast, setToast] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [theme, setTheme] = useState('light');

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) fetchTasks();
  }, [user]);

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-mode' : 'light';
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const fetchUser = async () => {
    try {
      const res = await fetch(`${API_BASE}/auth/user`, { credentials: 'include' });
      const data = await res.json();
      if (data.user) setUser(data.user);
    } catch {
      setToast('You are offline or server is down.');
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/tasks`);
      setTasks(res.data);
    } catch {
      setToast('No tasks.');
    }
  };

  const addTask = async () => {
    if (!taskInput.trim()) return showToast('Task description is required.');
    if (!assignee.trim()) return showToast('You must assign this task to someone.');

    try {
      const newTask = {
        text: taskInput,
        status,
        assignee,
        startDate,
        endDate,
        startTime,
        endTime
      };
      const res = await axios.post(`${API_BASE}/api/tasks`, newTask);
      setTasks([...tasks, res.data]);
      setTaskInput('');
      setAssignee('');
      setStartDate('');
      setEndDate('');
      setStartTime('');
      setEndTime('');
      showToast('Task added!');
    } catch {
      showToast('Failed to add task.');
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_BASE}/api/tasks/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
      showToast('Task deleted.');
    } catch {
      showToast('Failed to delete task.');
    }
  };

  const toggleComplete = async (task) => {
    try {
      const res = await axios.put(`${API_BASE}/api/tasks/${task._id}`, {
        completed: !task.completed
      });
      setTasks(tasks.map(t => (t._id === task._id ? res.data : t)));
      showToast('Task status updated.');
    } catch {
      showToast('Could not update task.');
    }
  };

  const startEdit = (task) => {
    setEditTaskId(task._id);
    setEditText(task.text);
    setEditAssignee(task.assignee || '');
  };

  const cancelEdit = () => {
    setEditTaskId(null);
    setEditText('');
    setEditAssignee('');
  };

  const saveEdit = async (id) => {
    if (!editText.trim()) return showToast('Task text cannot be empty.');
    if (!editAssignee.trim()) return showToast('Assignee cannot be empty.');

    try {
      const res = await axios.put(`${API_BASE}/api/tasks/${id}`, {
        text: editText,
        assignee: editAssignee
      });
      setTasks(tasks.map(t => (t._id === id ? res.data : t)));
      cancelEdit();
      showToast('Task updated.');
    } catch {
      showToast('Failed to save edit.');
    }
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleLogin = () => {
    window.location.href = `${API_BASE}/auth/google`;
  };

  const handleLogout = () => {
    window.location.href = `${API_BASE}/auth/logout`;
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'in progress') return !task.completed;
    return true;
  });

  return (
    <div className="todo-box">
      <h1 style={{ textAlign: 'center' }}>TaskMaster ✨</h1>
      <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
        <button className="toggle-theme" onClick={toggleTheme}>Theme</button>
      </div>

      {!user ? (
        <button className="google-btn" onClick={handleLogin}>Sign in with Google</button>
      ) : (
        <>
          <div className="user-info">
            <p>Welcome</p>
            <button className="signout-btn" onClick={handleLogout}>Sign Out</button>
          </div>

          <div className="filters">
            <select value={filter} onChange={e => setFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="in progress">In Progress</option>
            </select>
          </div>

          <div className="input-area">
            <input value={taskInput} onChange={e => setTaskInput(e.target.value)} placeholder="Task description..." />
            <input value={assignee} onChange={e => setAssignee(e.target.value)} placeholder="Assign to (email/username)" />
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
            <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} />
            <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} />
            <select value={status} onChange={e => setStatus(e.target.value)}>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <button id="addBtn" onClick={addTask}>+</button>
          </div>

          <ul className="task-list">
            {filteredTasks.map(task => (
              <li key={task._id} className={`task ${task.completed ? 'complete' : ''}`}>
                {editTaskId === task._id ? (
                  <>
                    <input className="task-text" value={editText} onChange={e => setEditText(e.target.value)} />
                    <input className="task-text" value={editAssignee} onChange={e => setEditAssignee(e.target.value)} />
                    <div className="actions">
                      <button onClick={() => saveEdit(task._id)}>💾</button>
                      <button onClick={cancelEdit}>❌</button>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="task-text" onClick={() => toggleComplete(task)}>
                      <strong>{task.text}</strong><br />
                      <small>
                        👤 {task.assignee?.trim() || 'Unassigned'} | {task.completed ? '✅ Completed' : '🔄 In Progress'}<br />
                        📅 {task.startDate || 'Start: —'} → {task.endDate || 'End: —'}<br />
                        🕒 {task.startTime || '--:--'} - {task.endTime || '--:--'}
                      </small>
                    </span>
                    <div className="actions">
                      <button onClick={() => startEdit(task)}>✏️</button>
                      <button onClick={() => deleteTask(task._id)}>🗑️</button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>

          {toast && <div className="toast">{toast}</div>}
        </>
      )}
    </div>
  );
}

export default App;
