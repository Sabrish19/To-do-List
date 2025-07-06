import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

axios.defaults.withCredentials = true;

function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const API_BASE = import.meta.env.VITE_API_URL || "https://to-do-list-1ttx.onrender.com";

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) fetchTasks();
  }, [user]);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${API_BASE}/auth/user`);
      if (res.data.user) {
        setUser(res.data.user);
      } else {
        // If not logged in, redirect to Google Sign-In
        window.location.href = `${API_BASE}/auth/google`;
      }
    } catch (error) {
      console.error("User fetch failed", error);
      window.location.href = `${API_BASE}/auth/google`;
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/tasks`);
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to fetch tasks");
    }
  };

  return (
    <div className="todo-box">
      <h1>Dashboard</h1>
      <p>Welcome, {user?.displayName || "User"}!</p>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>{task.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
