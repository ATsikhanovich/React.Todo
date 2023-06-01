import TodoList from './components/TodoList/TodoList';
import styles from './TodoApp.module.scss'

const TodoApp: React.FC = () => {
  return (
    <div className={styles.TodoApp}>
      <h1>Todo App</h1>
      <TodoList />
    </div>
  );
};

export default TodoApp;
