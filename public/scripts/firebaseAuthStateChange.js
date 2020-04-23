import { fbApp } from '/scripts/firebaseInit.js';

// firebase.auth().onAuthStateChanged(function(user) {
fbApp.auth().onAuthStateChanged(function(user) {
    console.log('onAuthStateChanged')
    if (user) {
      console.log('user signed in:' + user.uid)
      console.log(user)
      return firebase.auth().currentUser.getIdToken().then(function(idToken) {
          console.log('id Token is: ')
          console.log(idToken)
          document.cookie = "idToken =" + idToken
          window.location = '/'
      }).catch(function(error) {
          console.log('something went wrong with getting idToken')
          console.log(error)
      })
    } else {
      // User is signed out.
      console.log('user signed out')
      document.cookie = "cookieToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      // window.location = '/login'
    }
  });