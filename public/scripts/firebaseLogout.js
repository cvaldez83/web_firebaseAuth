import { fbApp } from '/scripts/firebaseInit.js';

// Log out 
btnLogout.addEventListener('click', e => {
    console.log('sign out button hit')
    fbApp.auth().signOut().then(() => {
    // firebase.auth().signOut().then(() => {
        // this.authStatus = 'Unauthorized'
        console.log('firebase auth signout')
        document.cookie = "cookieToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        location.href = '/'
    }).catch((err) => {
        console.log(err)
        this.authStatus = err
    })
})