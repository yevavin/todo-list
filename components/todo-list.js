import todos from '../models/todos.js'
import todoListCounter from './todo-counter.js';
import todoListFooter from './todo-list-footer.js';
import { getStateValue } from '../models/state.js';
import getItem from './todo-list-item.js';
import api from '../api.js';

const todoList = document.querySelector('#todoList');

todoList.addEventListener('update', () => {
  todoList.checkContent();
  todoList.render()
  todoListCounter.update();
  todoListFooter.stateUpdate();
});

todoList.applyFilter = () => {
  const todoListItems = todoList.querySelectorAll('.todo-list__item');
  todoListItems.forEach(item => {
    switch (getStateValue()) {
      case 'all':
        item.classList.remove('hidden');
        break;
      case 'active':
        Object.entries(todos.data).find(todo => item.id == todo[0])[1].checked ? item.classList.add('hidden') : item.classList.remove('hidden');
        break;
      case 'completed':
        Object.entries(todos.data).find(todo => item.id == todo[0])[1].checked ? item.classList.remove('hidden') : item.classList.add('hidden');
        break;
    }
  })
}

todoList.render = function () {
  todoList.getElementsByTagName('div')[0].innerHTML = ''
  Object.entries(todos.data)
    .filter(([key, todo]) => !todo.deleted)
    .forEach(([key, todo]) => {
      const todoListItem = getItem();
      const todoListItemLabel = todoListItem.querySelector('label');
      const todoListItemCheckbox = todoListItem.querySelector('input[type=checkbox]');
      todoListItem.setAttribute('id', key);
      switch (getStateValue()) {
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
      todoListItemLabel.setAttribute('for', `cb${key}`);
      todoListItemCheckbox.setAttribute('id', `cb${key}`);
      todo.checked
        ? todoListItemCheckbox.setAttribute('checked', 'checked')
        : todoListItemCheckbox.removeAttribute('checked');
      todo.checked
        ? todoListItemLabel.classList.add('todo-list__item-label_checked')
        : todoListItemLabel.classList.remove('todo-list__item-label_checked');
      todoList.getElementsByTagName('div')[0].append(todoListItem);
    });

  todoList.querySelectorAll('.todo-list__item-btn').forEach((item) => {
    item.addEventListener('click', removeItem);
  });
  todoList.querySelectorAll('.todo-list__item-checkbox').forEach(item => {
    item.addEventListener('click', compliteItem);
  });
  todoListFooter.render();
};

todoList.addItem = (itemValue) => {
  api.add(...todos.addTodo(itemValue))
  todoList.dispatchEvent(new Event('update'))
}

function removeItem(e) {
  const id = e.target.parentElement.id;
  api.update(...todos.removeTodo(id))
  todoList.dispatchEvent(new Event('update'));
};

function compliteItem(e) {
  const id = e.target.parentElement.id;
  api.update(...todos.toggle(id))
  todoList.dispatchEvent(new Event('update'));
};

todoList.checkContent = () => {
  const labelForEmptyList = document.querySelector('#labelForEmptyList')
  if (todos.length == 0) {
    labelForEmptyList.classList.remove('hidden');
  } else {
    labelForEmptyList.classList.add('hidden');
  }
}

todoList.checkContent();
todoList.render();

export default todoList;