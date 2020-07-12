import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyClYpRyi287oXfOsHMnIwaYsN0r9bQ-Ass",
  authDomain: "react-app-todo-39d07.firebaseapp.com",
  databaseURL: "https://react-app-todo-39d07.firebaseio.com",
  projectId: "react-app-todo-39d07",
  storageBucket: "react-app-todo-39d07.appspot.com",
  messagingSenderId: "375477589452",
  appId: "1:375477589452:web:9098e2d27d23c5bd8b7969",
  measurementId: "G-7WGXCN2S73",
});

const db = firebaseApp.firestore();
export default db;
