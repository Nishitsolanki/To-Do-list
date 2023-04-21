import  Todo from '../model/Todo'
import user from '../model/user'
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')

export let authentication = function (req, res, next) {

    //authentication code
    try {
  
      let token = req.headers["x-api-key"];
      if (!token) return res.status(400).send({ status: false, msg: "token must be present" });
  
      jwt.verify(token, "This is secret key", (error, decodedToken) => {
        if (error) {
          let message = (error.message == "jwt expired" ? "token is expired ,please login again" : "token is invalid,please recheck your token")
          return res.status(400).send({ status: false, msg: message })
        }
        console.log(decodedToken)
        req.decodedToken = decodedToken;
        next();
      });
  
    }
    catch (error) {
      return res.status(500).send({ status: false, msg: error.message });
    }
  }
  