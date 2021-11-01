import todos from '../models/todos.js'
import todoListCounter from './todo-counter.js'; 
import todoListFooter from './todo-list-footer.js';
import { getStateValue } from '../models/state.js';

const todoList = document.querySelector('#todoList');
todoList.addEventListener('update', () => {
  todoList.render()
  todoListCounter.update();
});

todoList.applyFilter = () => {
  const todoListItems = todoList.querySelectorAll('.todo-list__item');
  todoListItems.forEach(item => {
    switch(getStateValue()) {
      case 'all':
        item.classList.remove('hidden');
      break;
      case 'active':
        todos.find(todo => item.id == todo.id).checked ? item.classList.add('hidden') : item.classList.remove('hidden'); 
      break;
      case 'completed':
        todos.find(todo => item.id == todo.id).checked ? item.classList.remove('hidden') : item.classList.add('hidden'); 
      break;
    }
  })
}

const todoItemTemplate = `
  <div class="todo-list__item">
  <label class="todo-list__item-label"></label>
  <input type="checkbox" class="todo-list__item-checkbox"/>
  <div class="todo-list__item-btn"></div>
  </div>
  `;

  todoList.render = function() {
    let html = '';
    todos.forEach(todo => {
      const itemWrapper = document.createElement('div');
      itemWrapper.innerHTML = todoItemTemplate;
      const todoListItem = itemWrapper.querySelector('.todo-list__item');
      const todoListItemLabel = itemWrapper.querySelector('label');
      const todoListItemCheckbox = itemWrapper.querySelector('input[type=checkbox]');
      todoListItem.setAttribute('id', todo.id);
      switch(getStateValue()) {
        case 'all':
        break;
        case 'active':
          todo.checked && todoListItem.classList.add('hidden');
        break;
        case 'completed':
          !todo.checked && todoListItem.classList.add('hidden');
        break;
      }
      todoListItemLabel.innerText = todo.value;
      todoListItemLabel.setAttribute('for', `cb${todo.id}`);
      todoListItemCheckbox.setAttribute('id', `cb${todo.id}`);
      todo.checked 
      ? todoListItemCheckbox.setAttribute('checked', 'checked')
      : todoListItemCheckbox.removeAttribute('checked');
      todo.checked 
      ? todoListItemLabel.classList.add('todo-list__item-label_checked') 
      : todoListItemLabel.classList.remove('todo-list__item-label_checked');
      
      html += itemWrapper.innerHTML;
    });
    todoList.getElementsByTagName('div')[0].innerHTML = html;
    todoList.querySelectorAll('.todo-list__item-btn').forEach((item) => {
      item.addEventListener('click', removeItem);
    });
    todoList.querySelectorAll('.todo-list__item-checkbox').forEach(item => {
      item.addEventListener('click', compliteItem);
    });
    todoListFooter.render();
  };
  
  function removeItem(e) {
    const id = e.target.parentElement.id;
    todos.removeTodo(id);
    todoList.dispatchEvent(new Event('update'));
  };

  function compliteItem(e) {
    const parentElement = e.target.parentElement;
    const id = parentElement.id;
    todos.toggle(id);
    todoList.dispatchEvent(new Event('update'));
  };

  todoList.render();
  
  export default todoList;