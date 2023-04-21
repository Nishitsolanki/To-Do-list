import express, { Router } from 'express';


import { addTodo, getAllTodos, toggleTodoDone, updateTodo, deleteTodo } from '../controller/Todo-controller.js';
import { createuser,login } from '../controller/usercontroller.js';
import {authentication} from '../middleware/auth.js'

const route = express.Router();

//user 

route.post('/creat',createuser)
route.post('login', login)


//Todo
route.post('/todos',authentication, addTodo)
route.get('/todos',authentication, getAllTodos);
route.get('/todos/:id', authentication, toggleTodoDone);
route.put('/todos/:id', updateTodo);
route.delete('/todos/:id', deleteTodo);


export default route;