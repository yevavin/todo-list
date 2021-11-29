import userStore from './models/user.js'
import todoList from './components/todo-list.js';
import api from './api.js'

const signInWithGoogle = document.getElementById('signInWithGoogle');
const signOutWithGoogle = document.getElementById('signOutWithGoogle');

const provider = new firebase.auth.GoogleAuthProvider();

signInWithGoogle.addEventListener('click', signIn);
signOutWithGoogle.addEventListener('click', signOut);

function signIn() {
  firebase.auth().signInWithRedirect(provider);
};

function signOut() {
  firebase.auth().signOut()
}

firebase.auth().onAuthStateChanged((user) => {
  userStore.user = user;
  if (user) {
    api.load()
      .then((data) => api.compare(data))
      .then(() => todoList.render())
  }
})

firebase.auth().getRedirectResult().then((result) => {
  userStore.user = result.user;
})

export default signInWithGoogle;

