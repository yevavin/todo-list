
const todoItemTemplate = `
<div class="todo-list__item">
<label class="todo-list__item-label"></label>
<input type="checkbox" class="todo-list__item-checkbox"/>
<div class="todo-list__item-btn"></div>
</div>
`;

function displayPopup(e) {
   console.log(e.target)
}

export default function getItem() {
   let item = document.createElement('div')
   item.innerHTML = todoItemTemplate
   item = item.querySelector('div')
   item.addEventListener('click', displayPopup)
   return item
}

