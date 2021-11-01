import todos from '../models/todos.js'

const todoListCounter = document.querySelector('#todoList .todo-list__footer-counter');

todoListCounter.update = function() {
  this.innerText = `${todos.filter(item => !item.checked).length} item left`;
}

todoListCounter.update();

export default todoListCounter;
