// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app"
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRYDk1HgetR7bY1_gUcJ8ZMLtLcXAn0uQ",
  authDomain: "pantry-assistant-app.firebaseapp.com",
  projectId: "pantry-assistant-app",
  storageBucket: "pantry-assistant-app.appspot.com",
  messagingSenderId: "950423514077",
  appId: "1:950423514077:web:8e112629e1564f6a226434"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const firestore = getFirestore(app)
export {app, firestore}

require("dotenv").config
console.log(process.env.apiKey)