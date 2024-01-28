import React from 'react';
import './App.css';
import TodoList from './TodoList'; // Importing the TodoList component

function App() {
  // The main App component rendering the TodoList component
  return (
    <div className="App">
      <header className="App-header">
        <TodoList />  {/*TodoList component is included here*/}
      </header>
    </div>
  );
}

export default App;

