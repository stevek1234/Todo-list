import React, { useState } from 'react';
import '../App.css';
import { InputFieldProps, TodoItem } from '../types'; // Importing the TodoItem interface


const InputField: React.FC<InputFieldProps> = ({ onSubmit}) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(inputValue); // send value to parent component
        setInputValue(''); // optional: clear input after submit
      };

  return (
    <form className='input' onSubmit={handleSubmit}>
        <input 
            type="input" 
            placeholder='Enter a task' 
            className='input_box'
            value={inputValue}
            onChange={(e)=> setInputValue(e.target.value)} />
        <button className='input__submit' type='submit'>Enter</button>
    </form>

  );
}

export default InputField