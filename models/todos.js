const todos = {}
todos.data = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : {};

todos.addTodo = (todoValue) => {
  const key = '_' + Date.now()
  const data = {
    value: todoValue,
    checked: false,
    updatedTime: Date.now(),
    deleted: false,
  }
  todos.data[key] = data;
  saveTodos();
  return [key, data]
}

todos.removeTodo = (id) => {
  const data = todos.data[id]
  data.deleted = true
  data.updatedTime = Date.now()
  saveTodos();

  return [id, data]
}

todos.toggle = (id) => {
  const data = todos.data[id]
  data.checked = !data.checked
  data.updatedTime = Date.now()
  saveTodos();

  return [id, data]
}

const saveTodos = () => {
  todos.saveToLocalStorege()
}

todos.saveToLocalStorege = () => {
  const data = Object.entries(todos.data).reduce((accum, item) => {
    accum[item[0]] = item[1]
    return accum
  }, {})
  localStorage.setItem('todos', JSON.stringify(data))
}

export default todos;
