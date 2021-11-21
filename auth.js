import userStore from './models/user.js'

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
   .then(() => {
     setTimeout(function() {
       window.location.replace('./index.html')
     })
   });
}

firebase.auth().onAuthStateChanged((user) => {
  userStore.user = user;
})

export default signInWithGoogle;

