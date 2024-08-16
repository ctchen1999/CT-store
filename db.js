// require('dotenv').config({ path: './config.env' });
require('dotenv').config();
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Redis = require('ioredis');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING);

        console.log('DATABASE connection SUCCESS');
    } catch (err) {
        console.error('DATABASE connection FAILED');
        process.exit(1);
    }
};

const admin = require('firebase-admin');
const serviceAccount = require('./config/firebase adminsdk 8xyb5.json');

//TODO -> firebase connection
const connectFireBase = async () => {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
    // const defaultProjectManager = admin.projectManagement();
    // console.log(defaultProjectManager);
    const db = admin.firestore();
};

module.exports = {
    connectDB,
    connectFireBase,
};
