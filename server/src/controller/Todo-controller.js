const Todo = require('../model/Todo')

 const addTodo = async (req, res) => {
    try {

        if(!title) return res.status(400).send({status:false,message:"title is required"})

        if(!description) return res.status(400).send({status:false,message:"description is required"})

     


        const newTodo = await Todo.create({

            data: req.body.data,
            createdAt: Date.now()
        })

        await newTodo.save();
        return res.status(200).json(newTodo);

    } catch (error) {
        return response.status(500).json(error.message);
    }
}

 const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find({}).sort({ 'createdAt': -1 })

        return res.status(200).json(todos);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

 const toggleTodoDone = async (req, res) => {
    try {
        const todoRef = await Todo.findById(req.params.id);

        const todo = await Todo.findOneAndUpdate(
            { _id: req.params.id },
            { status: !todoRef }
        )

        await todo.save();

        return response.status(200).json(todo);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}

 const updateTodo = async (req, res) => {
    try {

        if(req.body.status =='done'||req.body.status =='pending'|| req.body.status =='progress'|| req.body.status =='completed')
        await Todo.findOneAndUpdate(
            { _id: req.params.id },
            { data: req.body.data }
        )

        const todo = await Todo.findById(req.params.id);

        return res.status(200).json(todo);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

 const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id)

        return response.status(200).json(todo);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = {addTodo, getAllTodos, toggleTodoDone, updateTodo, deleteTodo}