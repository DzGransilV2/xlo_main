require('dotenv').config({ path: '.env.local' });

const mongoose = require('mongoose');

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error('DATABASE_URL is not defined in the environment variables');
}

mongoose.connect(connectionString)

const {initializeApp} = require('firebase/app');
const {getStorage} = require('firebase/storage');

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PRO_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
};

let app;
let storage;


const initializeFirebaseApp = () =>{
    try{
        app = initializeApp(firebaseConfig);
        storage=getStorage(app);
        return app;
    }catch{
        console.log('Firebase App is not initialized');
    }
}

const getFirebaseApp = () => app;
const getFirebaseStorage = () => storage;

module.exports = {initializeFirebaseApp, getFirebaseApp, getFirebaseStorage}