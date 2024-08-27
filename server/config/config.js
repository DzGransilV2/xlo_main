require('dotenv').config({ path: '.env.local' });

const mongoose = require('mongoose');

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error('DATABASE_URL is not defined in the environment variables');
}

mongoose.connect(connectionString)

// const firebase = require('firebase')
// require('firebase/auth');
// require('firebase/firestore');
// // const initializeApp = require("firebase/app");
// const firebaseConfig = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.PRO_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID
// };
// const app = firebase.initializeApp(firebaseConfig);