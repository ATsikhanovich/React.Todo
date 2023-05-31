import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store'
import { toggleTodo, deleteTodo, addTodo, loadTodos } from '../../store/todos';
import TodoItem from '../TodoItem/TodoItem';
import AddTodo from '../AddTodo/AddTodo';
import { FilterType } from '../../enums/FilterType';
import { getFilteredTodos } from '../../helpers/getFilteredTodos';
import FilterButton from '../FilterButton/FilterButton';
import { loadTodosFromLocalStorage, saveTodosToLocalStorage } from '../../helpers/localStorage';
import styles from './TodoList.module.scss';

const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();
  const [filterType, setFilterType] = useState<FilterType>(FilterType.ALL);

  const visibleTodos = useMemo(() => {
    return getFilteredTodos(todos.todos, filterType);
  }, [filterType, todos.todos]);

  useEffect(() => {
    const items = loadTodosFromLocalStorage();
    dispatch(loadTodos(items))
  },[]);

  useEffect(() => {
      saveTodosToLocalStorage(todos.todos);
  },[todos.todos]);

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id));
  };

  const handleToggleTodo = (id: number) => {
    dispatch(toggleTodo(id));
  };

  const handleAddTodo = (text: string) => {
    dispatch(addTodo(text));
  };

  const handlefilter = (filterType: FilterType) => {
    setFilterType(filterType);
  };

  return (
    <div className={styles.TodoList}>
      <AddTodo onAddTodo={handleAddTodo} />
      <ul>
        {visibleTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={() => handleDeleteTodo(todo.id)}
            onToggle={() => handleToggleTodo(todo.id)}
          />
        ))}
      </ul>
      <div className={styles.FiltersPanel}>
        <FilterButton filterType={FilterType.ALL} name='All' currentFilter={filterType} onClick={handlefilter} />
        <FilterButton filterType={FilterType.ACTIVE} name='Active' currentFilter={filterType} onClick={handlefilter} />
        <FilterButton filterType={FilterType.COMPLETED} name='Completed' currentFilter={filterType} onClick={handlefilter} />
      </div>
    </div>
  );
};

export default TodoList;
