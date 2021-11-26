import userStore from './models/user.js'
import todos from './models/todos.js'
import todoList from './components/todo-list.js';
// import saveTodoToDB from './db.js';

const signInWithGoogle = document.getElementById('signInWithGoogle');
const signOutWithGoogle = document.getElementById('signOutWithGoogle');

const provider = new firebase.auth.GoogleAuthProvider();

signInWithGoogle.addEventListener('click', signIn);
signOutWithGoogle.addEventListener('click', signOut);

function signIn() {
  firebase.auth().signInWithRedirect(provider)
};

function signOut() {
  firebase.auth().signOut()
}

firebase.auth().onAuthStateChanged((user) => {
  userStore.user = user;
  if (user) {
    const API_PATH = `${user.uid}.json`;
    todos.load(API_PATH)
    .then(() => todoList.render())
  }
})

firebase.auth().getRedirectResult().then((result) => {
  userStore.user = result.user;
})

export default signInWithGoogle;

