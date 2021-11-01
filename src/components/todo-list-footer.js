import todos from "../models/todos.js";
import todoList from "./todo-list.js";
import {getState, setState} from '../models/state.js'

const todoListFooter = document.querySelector('#todoList .todo-list__footer');

todoListFooter.render = function() {
  todos.length 
      ? todoListFooter.classList.remove('todo-list__footer_hidden') 
      : todoListFooter.classList.add('todo-list__footer_hidden');
}

const clearBtn = todoListFooter.querySelector('#clearBtn');

clearBtn.addEventListener('click', () => {
  todos.filter(item => item.checked).forEach(item => todos.removeTodo(item.id));
  todoList.render();
});

const tabs = todoListFooter.querySelectorAll('.state-list h2');
tabs.forEach(tab => tab.addEventListener('click', (e) => {
  setState(e.target.dataset.state)
  todoListFooter.stateUpdate() 
  todoList.applyFilter() 
}));

todoListFooter.stateUpdate = function() {
  const state = getState()
  Object.keys(state).forEach(key => {
    const tab = todoListFooter.querySelector(`.state-list h2[data-state="${key}"]`)
    state[key] ? tab.classList.add('active') : tab.classList.remove('active')
  })
} 

export default todoListFooter;

todoListFooter.stateUpdate()