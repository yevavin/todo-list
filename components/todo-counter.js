import todos from '../models/todos.js'

const todoListCounter = document.querySelector('#todoList .todo-list__footer-counter');

todoListCounter.update = function() {
  const number = todos.filter(item => !item.checked).length;
  this.innerText = (number == 1)
  ? `${number} item left`
  : `${number} items left`
}

todoListCounter.update();

export default todoListCounter;
