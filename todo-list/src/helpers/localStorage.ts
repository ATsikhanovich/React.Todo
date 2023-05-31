import { Todo } from "../store/todos";

const todosItemName = 'todos';

export const loadTodosFromLocalStorage = () => {
    const items : Todo[] = JSON.parse(localStorage.getItem(todosItemName) ?? '[]');
    return items;
}

export const saveTodosToLocalStorage = (todos: Todo[]) => {
    localStorage.setItem(todosItemName, JSON.stringify(todos));
}