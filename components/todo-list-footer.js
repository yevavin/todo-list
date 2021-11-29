import todos from "../models/todos.js";
import todoList from "./todo-list.js";
import { getState, setState } from '../models/state.js'

const todoListFooter = document.querySelector('#todoList .todo-list__footer');

todoListFooter.render = function () {
  let todosLength = 0
  Object.values(todos.data)
    .forEach(todo => {
      !todo.deleted && todosLength++
    })
  todosLength == 0
    ? todoListFooter.classList.add('todo-list__footer_hidden')
    : todoListFooter.classList.remove('todo-list__footer_hidden');
}

const clearBtn = todoListFooter.querySelector('#clearBtn');

clearBtn.addEventListener('click', () => {
  Object.entries(todos.data)
    .filter(([key, item]) => item.checked)
    .forEach(([key, item]) => todos.removeTodo(key));
  todoList.dispatchEvent(new Event('update'));
});

const tabs = todoListFooter.querySelectorAll('.state-list button');
tabs.forEach(tab => tab.addEventListener('click', (e) => {
  setState(e.target.dataset.state)
  todoListFooter.stateUpdate()
  todoList.applyFilter()
}));

todoListFooter.stateUpdate = function () {
  const state = getState()
  Object.keys(state).forEach(key => {
    const tab = todoListFooter.querySelector(`.state-list button[data-state="${key}"]`);
    state[key] ? tab.classList.add('active') : tab.classList.remove('active');
    switch (key) {
      case 'active':
        Object.values(todos.data).find(item => !item.checked && !item.deleted)
          ? tab.removeAttribute('disabled') : tab.setAttribute('disabled', 'disabled')
        break;
      case 'completed':
        Object.values(todos.data).find(item => item.checked && !item.deleted)
          ? tab.removeAttribute('disabled') : tab.setAttribute('disabled', 'disabled')
        break;
    }
  })

}

export default todoListFooter;

todoListFooter.stateUpdate()