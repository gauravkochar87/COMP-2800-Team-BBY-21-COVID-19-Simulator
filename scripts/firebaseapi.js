///////////////////////////////////////////////////////////////
////           web app's Firebase configuration            ////
///////////////////////////////////////////////////////////////

var firebaseConfig = {
    apiKey: "AIzaSyBYD2hbsr7fXqaw1K3I7PzcYp5EnjzgHFU",
    authDomain: "project-simulator-c6a21.firebaseapp.com",
    databaseURL: "https://project-simulator-c6a21.firebaseio.com",
    projectId: "project-simulator-c6a21",
    storageBucket: "project-simulator-c6a21.appspot.com",
    messagingSenderId: "434842315330",
    appId: "1:434842315330:web:9c0374430117077d35dbdb",
    measurementId: "G-FQPNETH04V"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

//making auth and firestore refrences
const db = firebase.firestore();
const auth = firebase.auth();