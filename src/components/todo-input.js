import todoList from "./todo-list.js";

const todoInput = document.querySelector('#newTodo');
todoInput.addEventListener('input', (e) => {
  e.target.setAttribute('value', todoInput.value)
});

const todoInputBtn = document.querySelector('#newTodoBtn');
todoInputBtn.addEventListener('click', () => {
  todoList.addItem(todoInput.value)
  todoInput.setAttribute('value', '')
  todoInput.value = ''
});

export default todoInput;