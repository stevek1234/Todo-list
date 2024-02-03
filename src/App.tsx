import React from 'react';
import './App.css';
import TodoList from './components/TodoList'; // Importing the TodoList component

function App() {
  const title = 'My To-do List'
  // The main App component rendering the TodoList component
  return (
    <div className="App">
      <h1>
          { title}
        </h1>
      <div className="content">
        <div>
          <TodoList />  {/*TodoList component is included here*/}
        </div>
      </div>
    </div>
  );
}

export default App;

