import { fbApp } from '/scripts/firebaseInit.js';

// Get html elements
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');

// Sign in with email
btnLogin.addEventListener('click', e => {
    console.log('sign in with email button hit')
    const email = txtEmail.value;
    const password = txtPassword.value;

    axios.post('https://example.com/login', {
        email: email,
        password: password
    })

    // // Sign in (simple)
    // fbApp.auth().signInWithEmailAndPassword(email, password).then(() => {
    //     console.log('signing in...')
    // }).catch(e => console.log(e.message));

    
    // Sign in with persistence
    fbApp.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(function() {
        console.log('signing in...')
      return fbApp.auth().signInWithEmailAndPassword(email, password);
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
   
    // // Sign in
    // const auth = firebase.auth();
    // const promise = auth.signInWithEmailAndPassword(email, password);
    // promise.catch(e => console.log(e.message));
});