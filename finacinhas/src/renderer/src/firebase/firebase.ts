/* eslint-disable @typescript-eslint/no-unused-vars */

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAx84N1pdFudA3r5LRfJ3EkaNyxznopC7w',
  authDomain: 'financinhas-985ad.firebaseapp.com',
  projectId: 'financinhas-985ad',
  storageBucket: 'financinhas-985ad.firebasestorage.app',
  messagingSenderId: '88283936934',
  appId: '1:88283936934:web:a0582025a570a11f14dc67'
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { app, auth, db }
