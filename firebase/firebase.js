import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDENPNufSHwpOpAvZMkShygJgilRZ2cg1w",
  authDomain: "demoproject-27636.firebaseapp.com",
  databaseURL: "https://demoproject-27636.firebaseio.com",
  projectId: "demoproject-27636",
  storageBucket: "demoproject-27636.appspot.com",
  messagingSenderId: "700316612864",
  appId: "1:700316612864:web:d0608fe7e1cf5206e41be5",
  measurementId: "G-7XBBYSL0CE"
};

export default firebaseConfig = firebase.initializeApp(config);