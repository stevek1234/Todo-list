import React, { useState, useEffect } from 'react';
import { TodoItem } from './types'; // Importing the TodoItem interface
import { response } from 'express';
import './App.css';

// Defining the TodoList component using React Functional Component syntax
const TodoList: React.FC = () => {
    // State 'todos' is initialized as an empty array. It will store the list of todo items.
    // setTodos is the function used to update the state.
    const [todos, setTodos] = useState<TodoItem[]>([]);
  
    // useEffect hook to fetch todo items when the component mounts.
    // The empty dependency array [] means this effect runs once on component mount.
    useEffect(() => {
      // Fetching data from json-server. It serves the data on 'http://localhost:5000/todos'.
      fetch('http://localhost:5000/todos')
        .then(response => response.json()) // Parsing the response to JSON
        .then(data => setTodos(data)); // Updating the todos state with the fetched data
    }, []);

const addTodo = (title:string) => {
    const newTodo: TodoItem = {
        id: Date.now(),
        title,
        completed: false
    }
    fetch('http://localhost:5000/todos', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json', // Specify the content type
        },
        body:JSON.stringify(newTodo) // body data type must match "Content-Type" header
    })
    .then(response => response.json())
    .then(data => {
        // Update the state with the new todo
        setTodos([...todos, data]);
    })
    .catch(error => {
        // Handle the error
        console.error('Error:', error);
    });
};

const updateTodoItem = (id:number) => {
    const todo = todos.find(t => t.id === id);
    
    if (todo) {
        // If not completed, mark as completed and update the database
        if( !todo.completed) {
            const updatedTodo = { ...todo, completed: true };
            fetch(`http://localhost:5000/todos/${id}`, {
            method: 'PUT',
            })
            .then(response => response.json())
            .then(() => {
            setTodos(todos.map(t => (t.id === id ? updatedTodo : t)));
            });
        } 
    }
  };

const deleteTodoItem = (id:number) => {
    console.log(id)
    const todo = todos.find(t => t.id === id);
    console.log(todo)
    if (todo) {
            fetch(`http://localhost:5000/todos/${id}`, {
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

const testAddTodo = () => {
    const testTitle = "New Test Todo";
    addTodo(testTitle);
  };
  
  // Rendering the list of todos
  return (
    <div>
      <div>
        {todos.map(todo => (
        <div className='todoContainer' key={todo.id}>
            <div className="todoItem" onClick={() => updateTodoItem(todo.id)}>
                {todo.title} {todo.completed ? "(Completed)" : ""} 
            </div>
            <div className='deleteButton' onClick={() => deleteTodoItem(todo.id)}>
                Delete
            </div>
        </div>))}
      </div>

      <div onClick={testAddTodo}>
        Add item to list
      </div>
    </div>
  );
  
        }
export default TodoList;
        
