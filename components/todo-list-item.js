import displayItemInfo from "./todo-list-popup.js";

const todoItemTemplate = `
<div class="todo-list__item">
<label class="todo-list__item-label"></label>
<input type="checkbox" class="todo-list__item-checkbox"/>
<div class="todo-list__item-btn"></div>
</div>
`;

export default function getItem() {
   let item = document.createElement('div')
   item.innerHTML = todoItemTemplate
   item = item.querySelector('div')
   item.addEventListener('click', (e) => {
      e.target.classList.contains('todo-list__item')
      ? displayItemInfo(e.target)
      : console.log(e.target)
   })
   return item
}
