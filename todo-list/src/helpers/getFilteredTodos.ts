import { FilterType } from "../enums/FilterType";
import { Todo } from "../store/todos";

export const getFilteredTodos = (
    todos: Todo[],
    filterType: FilterType,
  ) => {
    return todos.filter(todo => {
      switch (filterType) {
        case FilterType.ACTIVE:
          return !todo.completed;
  
        case FilterType.COMPLETED:
          return todo.completed;
  
        default:
          return todos;
      }
    });
  };