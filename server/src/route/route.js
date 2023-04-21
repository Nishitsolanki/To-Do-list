const express =require("express")
const router=express.Router()

const{ addTodo, getAllTodos, toggleTodoDone, updateTodo, deleteTodo } = require('../controller/Todo-controller.js');
const {createuser,login} = require('../controller/usercontroller.js')
const { authentication } = require('../middleware/auth.js')







//user 

router.post('/creat',createuser)
router.post('login', login)


//Todo
router.post('/todos',authentication ,addTodo)
router.get('/todos', getAllTodos);
router.get('/todos/:id',  toggleTodoDone);
router.put('/todos/:id', updateTodo);
router.delete('/todos/:id', deleteTodo);


router.all("/*", async function(req,res){
    return res.status(400).send({status:false,message:"plz check url"})
})

module.exports=router;