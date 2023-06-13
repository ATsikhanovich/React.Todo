import React, { useState } from 'react';
import styles from './AddTodo.module.scss'

interface AddTodoProps {
    onAddTodo: (text: string) => void;
  }
  
  const AddTodo: React.FC<AddTodoProps> = ({ onAddTodo }) => {
    const [inputValue, setInputValue] = useState('');
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    };
  
    const handleAddTodo = () => {
      if (inputValue.trim() !== '') {
        onAddTodo(inputValue);
        setInputValue('');
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          handleAddTodo();
        }
      };
  
    return (
      <div className={styles.AddTodo}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
    );
  };
  
  export default AddTodo;
