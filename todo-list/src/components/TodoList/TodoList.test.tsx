import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import TodoList from './TodoList';
import { renderWithProviders } from '../../utils/test-utils';
import { RootState } from '../../store/store';
import * as localStorageHelpers from '../../helpers/localStorage'


describe('TodoList', () => {

  const mockLoadFromStorage = jest.spyOn(localStorageHelpers, "loadTodosFromLocalStorage");

  let initialState: RootState;

  const todos =  [
    { id: 1, text: 'Todo 1', completed: false },
    { id: 2, text: 'Todo 2', completed: false },
    { id: 3, text: 'Todo 3', completed: false },
  ]

  beforeEach(() => {
    initialState = {
      todos: {
        todos: todos
      }
    }
    mockLoadFromStorage.mockImplementation(() => todos)
  });

  afterAll(() => {
    mockLoadFromStorage.mockRestore();
  });

  test('renders the list of todos', () => {
    renderWithProviders(<TodoList />, {
      preloadedState: initialState
    });

    const todoItems = screen.getAllByRole('listitem');
    expect(todoItems.length).toBe(3);
  });

  test('deletes a todo when delete button is clicked', () => {
    renderWithProviders(<TodoList />, {
      preloadedState: initialState
    });

    const deleteButtons = screen.getAllByRole('button', { name: 'Delete' });
    expect(deleteButtons.length).toBe(3);

    fireEvent.click(deleteButtons[0]);

    const updatedTodoItems = screen.getAllByRole('listitem');
    expect(updatedTodoItems.length).toBe(2);
  });

  test('toggles a todo when checkbox is clicked', () => {

    renderWithProviders(<TodoList />, {
      preloadedState: initialState
    });

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBe(3);

    fireEvent.click(checkboxes[1]);

    const updatedCheckbox = screen.getByRole('checkbox', { checked: true });
    expect(updatedCheckbox).toBeInTheDocument();
  });
});