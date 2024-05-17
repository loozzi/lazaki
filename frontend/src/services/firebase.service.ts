// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, getAuth } from 'firebase/auth'
import envConfig from '~/configs/env.config'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: envConfig.FIREBASE_API_KEY,
  authDomain: 'lazaki-f81d3.firebaseapp.com',
  projectId: 'lazaki-f81d3',
  storageBucket: 'lazaki-f81d3.appspot.com',
  messagingSenderId: '631988905838',
  appId: '1:631988905838:web:02b1aefecef4b98172037f',
  measurementId: 'G-PGK4PK71D7'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const facebookProvider = new FacebookAuthProvider()
export const githubProvider = new GithubAuthProvider()
export default app
