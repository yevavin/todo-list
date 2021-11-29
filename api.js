import userStore from './models/user.js'
const api = {}
const dbUrl = 'https://todo-list-app-43909-default-rtdb.firebaseio.com/todos/'

api.load = async () => {
   return fetch(
      `${dbUrl}${userStore.user.uid}.json?auth=${userStore.user._lat}`,
      { 
         method: 'GET', 
      }
   )
      .then(response => response.json())
}


api.add = (key, value) => {
   return fetch(
      `${dbUrl}${userStore.user.uid}/${key}.json?auth=${userStore.user._lat}`,
      {
         method: 'PATCH',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(value)
      })
      .then(response => response.json)
}

api.update = (key, value) => {
   return fetch(
      `${dbUrl}${userStore.user.uid}/${key}.json?auth=${userStore.user._lat}`,
      {
         method: 'PATCH',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(value)
      }
   )
      .then(response => response.json())
}

api.compare = async function (todosFromDB) {
   let todosFromLS = getTodosFromLS();

   todosFromDB = Object.entries(todosFromDB)
   todosFromLS.map(([key, value]) => {
      try {
         const findedInDB = todosFromDB.find(([id, item]) => id == key)
         const findedKey = findedInDB[0]
         const findedValue = findedInDB[1]
         if (findedInDB) {
            findedValue.updatedTime < value.updatedTime
               ? api.update(key, value)
               : Object.assign(value, findedValue)
            api.update(key, value)
         } else {
            api.add(key, value)
         }
         // исключаем из todosFromDB уже сравненный объект
         todosFromDB = todosFromDB.filter(([id, item]) => findedInDB && findedKey != id)
      } catch (e) {
         console.log('Authentication error: not autorized')
      }
   })

   todosFromDB.map(item => {
      !item[1].deleted && todosFromLS.push(item)
   })
   todosFromLS = todosFromLS.filter(item => !item.deleted)
   localStorage.setItem('todos', JSON.stringify(todosFromLS.reduce((accum, item) => {
      accum[item[0]] = item[1]
      return accum
   }, {})))
}

function getTodosFromLS() {
   return Object.entries(JSON.parse(localStorage.getItem('todos') || '{}'));
}

export default api