
const todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];

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

export default todos;
