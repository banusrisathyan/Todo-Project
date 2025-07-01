import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';
import FilterBar from '../components/FilterBar';
import { useNavigate } from "react-router-dom";
import backgroundImage from '../assests/to-do.png';

const API = "https://todo-backend-a8kh.onrender.com";
function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ✅ Fetch tasks
  useEffect(() => {
    axios.get(`${API}/api/tasks`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => setTodos(res.data))
      .catch((err) => console.error("❌ Error fetching tasks", err));
  }, [token]);

  // ✅ Add task
  const addTodo = (text) => {
    axios.post(`${API}/api/tasks`, { text }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => setTodos([...todos, res.data]))
      .catch((err) => console.error("❌ Error adding task", err));
  };

  // ✅ Update task status
  const updateStatus = (id, status) => {
    axios.put(`${API}/api/tasks/${id}`, { status }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) =>
        setTodos(todos.map((todo) =>
          todo._id === id ? res.data : todo
        ))
      )
      .catch((err) => console.error("❌ Error updating task", err));
  };

  // ✅ Delete task
  const deleteTodo = (id) => {
    axios.delete(`${API}/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => setTodos(todos.filter((todo) => todo._id !== id)))
      .catch((err) => console.error("❌ Error deleting task", err));
  };

  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = () => {
    setLoggingOut(true);
    localStorage.removeItem("token");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  // ✅ Compute counts for filters
  const allCount = todos.length;
  const pendingCount = todos.filter(todo => todo.status === "pending").length;
  const doneCount = todos.filter(todo => todo.status === "done").length;

  return (
    <div className="dashboard" style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: '100%',
      height: '100%'
    }}>
      <div className='dashboard-top'>
        <h1>Welcome to Todo Dashboard</h1>
        <button onClick={handleLogout} title="See you, bye!">Logout</button>
        {loggingOut && <p style={{ color: "black", padding: "5px" }}>Logging out... See you soon!</p>}
      </div>

      <TodoForm addTodo={addTodo} />
      <FilterBar
        filter={filter}
        setFilter={setFilter}
        counts={{ all: allCount, pending: pendingCount, done: doneCount }}
      />
      <TodoList
        todos={todos}
        filter={filter}
        updateStatus={updateStatus}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}

export default Dashboard;
