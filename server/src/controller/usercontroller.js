
const users = require('../model/user')
const { isValid, validateEmail } = require('../validation/validator')
const jwt = require('jsonwebtoken')


 const createuser = async function (req ,res){

    try {

        let data = req.body

        let {name,email,password} = data

        if (!(data)) return res.status(400).send({ status: true, message: "Body can't be Empty!" })

        if (!name) return res.status(400).send({ status: false, message: " Name is Mandatory" })
        if (!(name)) return res.status(400).send({ status: false, message: "Name contains only letters" })

        if (!email) return res.status(400).send({ status: false, message: "Email is Mandatory" })
        if (!validateEmail(email.trim())) return res.status(400).send({ status: false, message: "Email is in Invalid Format" })

        let duplicateEmail = await users.findOne({ email: email })
        if (duplicateEmail) return res.status(409).send({ status: false, message: `User is already registered with ${email} Email` })
        
        if (!password) return res.status(400).send({ status: false, message: "Password is Mandatory" })
        if (!isValidPassword(password)) return res.status(400).send({ status: false, message: "Password length should be between 8-15" })


        const create = await users.create(data)
        return res.status(201).send({statis:true ,msg:"data create sucessfully", data:create})      
        
    } catch (error) {
        return res.status(500).send(error.message);  
    }
}

 let login = async function (req, res) {

    try {

        let email = req.body.email;
        let password = req.body.password;

        
        if (!isValidBody(data)) {
            return res.status(400).send({ status: false, msg: "request body canot be empty" })
        }

        if(!email){
            return res.status(400).send({ msg: `Email is required`, status: false })
        }
        if(!password){
            return res.status(400).send({ msg: `Password is required`, status: false })
        }
        if (!validateEmail(email)) {
            return res.status(400).send({ msg: `Email is invalid`, status: false })
        }
        if (!isValidPassword(password)) {
            return res.status(400).send({ msg: "Password is invalid", status : false})
        }

        let user = await users.findOne({ email: email, password: password });
        if (!user) return res.status(401).send({ msg: "Try with another email or password", status: false })

        let token = jwt.sign(
            {
                userId: user._id.toString(),
                Title: "digitalbrainmedia"
            }, "This is secret key")

         res.setHeader("x-api-key", token);
       return res.status(200).send({ status: true, data:{token:token}  });
    }
    catch (error) {
        return res.status(500).send({ msg: error.message, status: false });
    }
}
 


module.exports = {createuser,login}