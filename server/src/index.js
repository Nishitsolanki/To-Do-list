const express = require('express');
const route = require('./route/route');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());


mongoose.connect("mongodb+srv://nisitsolanki:9978793231@cluster0.te1decq.mongodb.net/To-Do", {
    useNewUrlParser: true
})

    .then(() => console.log("MongoDb is connected.........."))
    .catch(err => console.log(err))

app.use('/', route);

app.listen(3001,()=>{
console.log("Express app running "+ 3001)  })


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['done', 'pending', 'in progress', 'completed'],
    default: 'pending'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);
const Task = mongoose.model('Task', taskSchema);

module.exports = { User, Task };