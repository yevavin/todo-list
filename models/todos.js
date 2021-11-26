
let todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];

import userStore from "./user.js";

const API_URL = 'https://todo-list-app-43909-default-rtdb.firebaseio.com/todos/';

todos.load = async (path) => {
  return fetch(
    API_URL + path,
    { method: 'GET' }
  )
    .then(response => response.json())
    .then((data) => Object.values(data))
    .then((data) => {
      console.log(data)
      todos.splice(0)
      todos.push(...data)
    })
}

todos.addTodo = (todo) => {
  todos.push({
    id: '_' + Date.now(),
    value: todo,
    checked: false,
  });
  saveTodos();
}

todos.removeTodo = (id) => {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id == id) {
      todos.splice(i, 1);
      break;
    }
  }
  saveTodos();
}

todos.toggle = (id) => {
  const item = todos.find(item => item.id == id);
  item.checked = !item.checked;
  saveTodos();
}

const saveTodos = () => {
  localStorage.setItem('todos', JSON.stringify(todos));
}

todos.saveTodosToDatabase = (API_PATH) => {
  let todosFromLocalStorage = JSON.parse(localStorage.getItem('todos'));
  todosFromLocalStorage = todosFromLocalStorage.reduce(function (acc, item, index) {
    acc[index] = item;
    return acc;
  }, {})
  try {
    fetch(API_URL + API_PATH, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todosFromLocalStorage)
    });
  } catch (ex) {
    console.error('ex:', ex);
  }
}

export default todos;
