import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyBHUA9ih28AknncOhTD5L1Uqlb03PE3M1I",
    authDomain: "favgithubrepos.firebaseapp.com",
    databaseURL: "https://favgithubrepos.firebaseio.com",
    projectId: "favgithubrepos",
    storageBucket: "",
    messagingSenderId: "585478263932"
};
firebase.initializeApp(config);

export default config