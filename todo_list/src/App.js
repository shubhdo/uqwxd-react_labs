import React, {useEffect, useState} from "react";
import "./App.css";
const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoEditing, setTodoEditing] = useState(null);
  
  useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if(loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  useEffect(() => {
    if(todos.length > 0) {
      const json = JSON.stringify(todos);
      localStorage.setItem("todos", json);
    }
  }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();

    let todo = document.getElementById("todoAdd").value;
    const newTodo = {
      id: new Date().getTime(),
      text: todo.trim(),
      completed: false
    }

    if(newTodo.text.length > 0) {
      setTodos([...todos].concat(newTodo));
    } else {
      alert("Enter valid task");
    }

    document.getElementById("todoAdd").value = "";
  }  
  
  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  
  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if(todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    })

    setTodos(updatedTodos);
  }
  
  function submitEdits(newtodo) {
    const updatedTodos = [...todos].map((todo) => {
      if(todo.id === newtodo.id) {
        todo.text = document.getElementById(newtodo.id).value;
      }
      return todo;
    })

    setTodos(updatedTodos);
    setTodoEditing(null);
  }

  
return(
<div id="todo-list" className ="App">
<h1>Todo List</h1>
<form onSubmit={handleSubmit}>
<input type ="text" align ="right" id= 'todoAdd'/>
<button type ="submit">Add Todo</button>
</form>
{todos.map((todo) => (
  <div className="todo" key={todo.id}>

    <div className="todo=text">{
      todo.id === todoEditing?
      <input type="text" id={todo.id} defaultValue={todo.text} />
      :todo.text
    }</div>
    {
      todo.id === todoEditing ?
      <button onClick={() => submitEdits(todo)}>Submit Edit</button>:
      <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
    }
    <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    <input onChange={() => toggleComplete(todo.id)} type="checkbox" id="completed" checked={todo.completed} />
  </div>
))}
</div>
);
};
export default App;
