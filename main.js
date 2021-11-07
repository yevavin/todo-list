window.addEventListener('load', async () => {
  if (navigator.serviceWorker) {
    try {
      const reg = await navigator.serviceWorker.register('./sw.js')
    } catch (e) {
      console.log ('error:', e)
    }   
  }
})

import todos from './models/todos.js';
import themeSwitcher from './components/theme-switcher.js'
import todoList from './components/todo-list.js';
import todoInput from './components/todo-input.js';