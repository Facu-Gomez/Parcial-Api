const mongoose = require('mongoose');
const dbconnect = () => {
    mongoose.set('strictQuery', true)
    mongoose.connect('mongodb://127.0.0.1:27017/parcial')
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch(error => {
      console.error('Error connecting to MongoDB', error);
    });
}

module.exports = dbconnect;