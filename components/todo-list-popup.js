const itemInfoPopup = document.getElementById('itemInfoPopup')

export default function displayItemInfo(e) {
   const value = e.querySelector('.todo-list__item-label').innerText
   itemInfoPopup.querySelector('.popup__content').innerText = value
   itemInfoPopup.parentElement.classList.remove('hidden')
   itemInfoPopup.classList.remove('hidden')
}

document.querySelector('#itemInfoPopup .close-btn').addEventListener('click', () => {
   itemInfoPopup.parentElement.classList.add('hidden')
   itemInfoPopup.classList.add('hidden')
})
