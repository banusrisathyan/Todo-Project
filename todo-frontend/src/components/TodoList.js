import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, filter, updateStatus, deleteTodo }) {
  const filtered = todos.filter(todo =>
    filter === "all" ? true : todo.status === filter
  );

  return (
    <div className="todo-list">
      {filtered.map(todo => (
        <TodoItem key={todo._id} todo={todo} updateStatus={updateStatus} deleteTodo={deleteTodo} />
      ))}
    </div>
  );
}

export default TodoList;
