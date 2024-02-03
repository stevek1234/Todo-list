import React, { useState, useEffect } from 'react';
import { TodoItem, InputFieldProps } from '../types'; // Importing the TodoItem interface
import { response } from 'express';
import InputField from './InputField';
import '../App.css';

// Defining the TodoList component using React Functional Component syntax
const TodoList: React.FC = () => {
    const [valueFromInput, setValueFromInput] = useState<string>("");
    // State 'todos' is initialized as an empty array. It will store the list of todo items.
    // setTodos is the function used to update the state.
    const [todos, setTodos] = useState<TodoItem[]>([]);


    // useEffect hook to fetch todo items when the component mounts.
    // The empty dependency array [] means this effect runs once on component mount.
    useEffect(() => {
      // Fetching data from json-server. It serves the data on 'http://localhost:5000/todos'.
      fetch('http://localhost:8000/todos')
        .then(response => response.json()) // Parsing the response to JSON
        .then(data => setTodos(data)); // Updating the todos state with the fetched data
    }, []);

const addTodo = (title:string) => {
    setValueFromInput(title);
    const newTodo: TodoItem = {
        id: String(Date.now()),
        title,
        completed: false
    }
    fetch('http://localhost:8000/todos', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json' // Specify the content type
        },
        body:JSON.stringify(newTodo) // body data type must match "Content-Type" header
    })
    .then(response => {
        return response.json()
    })
    .then(data => {
        // Update the state with the new todo
        setTodos([...todos, data]);
        console.log(setTodos)
    })
    .catch(error => {
        // Handle the error
        console.error('Error:', error);
    });
};
console.log(setTodos)

const updateTodoItem = (id:string) => {
    const todo = todos.find(t => t.id === id);
    console.log(todo)
    if (todo) {
        // If not completed, mark as completed and update the database
        if( !todo.completed) {
            console.table(todos)
            const updatedTodo = { ...todo, completed: true };

            fetch(`http://localhost:8000/todos/${todo.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedTodo)
            })
            .then(response => response.json())
            .then(data => {
            setTodos(todos.map(t => (t.id === id ? updatedTodo : t)));
            });
        } 
    }
  };

const deleteTodoItem = (id:string) => {
    console.log(id)
    const todo = todos.find(t => t.id === id);
    console.log(todo)
    if (todo) {
            fetch(`http://localhost:8000/todos/${todo.id}`, {
              method: 'DELETE',
            })
            .then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                // Update the state only after confirming the server response is OK
                setTodos(todos.filter(t => t.id !== id));
              })
              .catch(error => {
                console.error('Delete error:', error);
              });
          }
    };
  
  // Rendering the list of todos
  return (
    <div>
      <InputField onSubmit={addTodo}></InputField>
        {todos.map(todo => (
        <div className='todoContainer'>
            <div className="todoItem" key={todo.id} onClick={() => updateTodoItem(todo.id)}>
              <div className={todo.completed?'strikeThrough':''}>
                {todo.title}
              </div>
                {/* {todo.title} {todo.completed ? "(Completed)" : ""}  */}
            </div>
            <button className='deleteButton' onClick={() => deleteTodoItem(todo.id)}>
                Delete
            </button>
        </div>))}

    </div>
  );
  
        }
export default TodoList;
        
