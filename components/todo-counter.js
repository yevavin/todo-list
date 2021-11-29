import todos from '../models/todos.js'

const todoListCounter = document.querySelector('#todoList .todo-list__footer-counter');

todoListCounter.update = function() {
  const number = Object.values(todos.data).filter(item => !item.deleted && !item.checked).length;
  this.innerText = (number == 1)
  ? `${number} item left`
  : `${number} items left`
}

todoListCounter.update();

export default todoListCounter;
