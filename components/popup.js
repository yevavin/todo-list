import userStore from '../models/user.js'

const loginBtn = document.querySelector('#login');
loginBtn.addEventListener('click', () => {
  popup_wrapper.classList.remove('hidden');
})
const logoutBtn = document.querySelector('#logout');
logout.addEventListener('click', () => {
  popup_wrapper.classList.remove('hidden');
})
let popup_wrapper = document.querySelector('.popup-wrapper')

popup_wrapper.querySelectorAll('.close-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    popup_wrapper.classList.add('hidden');
  });
})

function testValue(user){
  const signInPopup = popup_wrapper.querySelector('#signIn')
  signInPopup.classList.add('hidden')
  const signOutPopup = popup_wrapper.querySelector('#signOut')
  signOutPopup.classList.add('hidden')
  //loginBtn.classList.add('hidden')
  //logoutBtn.classList.add('hidden')
  if (user) {
    signOutPopup.classList.remove('hidden');
    loginBtn.classList.add('hidden')
    logoutBtn.classList.remove('hidden')
  }
  else {
    signInPopup.classList.remove('hidden');
    loginBtn.classList.remove('hidden')
    logoutBtn.classList.add('hidden')
  }
}
Object.onPropertySet(userStore, "user", testValue);

export default popup_wrapper;