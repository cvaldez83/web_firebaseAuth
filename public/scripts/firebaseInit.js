// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};
// Initialize Firebase
console.log('initializing firebase')
// firebase.initializeApp(firebaseConfig);
const fbApp = firebase.initializeApp(firebaseConfig);


export {fbApp}