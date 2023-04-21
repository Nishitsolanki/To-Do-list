const mongoose = require('mongoose')



const TodoSchema = new mongoose.Schema({
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
    enum: ['done', 'pending', 'progress', 'completed'],
    default :"pending"
    
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
}
 
});

module.exports = mongoose.model('Todo',TodoSchema)

