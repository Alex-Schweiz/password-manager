import * as firebase from 'firebase';

let config = {
  apiKey: "AIzaSyDj8Ad44lf9Er1SId6KBgHxNliEHvwc4e0",
  authDomain: "react-password-manager-7.firebaseapp.com",
  databaseURL: "https://react-password-manager-7.firebaseio.com",
  projectId: "react-password-manager-7",
  storageBucket: "react-password-manager-7.appspot.com",
  messagingSenderId: "937609982307"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const auth = firebase.auth();