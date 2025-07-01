import React from 'react';

function TodoItem({ todo, updateStatus, deleteTodo }) {
  return (
    <div className={`todo-item ${todo.status}`}>
      <span>{todo.text}</span>
      <select value={todo.status} onChange={(e) => updateStatus(todo._id, e.target.value)}>
        <option value="pending">Pending</option>
        <option value="done">Done</option>
      </select>
      <button onClick={() => deleteTodo(todo._id)}>Delete</button>
    </div>
  );
}

export default TodoItem;
