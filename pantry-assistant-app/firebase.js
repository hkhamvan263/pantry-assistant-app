// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app"
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  authDomain: "pantry-assistant-app.firebaseapp.com",
  projectId: "pantry-assistant-app",
  storageBucket: "pantry-assistant-app.appspot.com",
  messagingSenderId: "950423514077",
  appId: "1:950423514077:web:8e112629e1564f6a226434"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const firestore = getFirestore(app)
export {firestore}

require("dotenv").config
console.log(process.env.apiKey)
console.log(process.env.projectId)
console.log(process.env.messagingSenderId)
console.log(process.env.appId)