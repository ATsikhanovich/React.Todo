import React from 'react';
import { Todo } from '../../store/todos';
import styles from './TodoItem.module.scss'

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <li className={styles.TodoItem}>
      <input type="checkbox" checked={todo.completed} onChange={onToggle} />
      <span
        className={todo.completed ? styles.completed : ''}
        onClick={onToggle}
      >
        {todo.text}
      </span>
      <button onClick={onDelete}>Delete</button>
    </li>
  );
};

export default TodoItem;
