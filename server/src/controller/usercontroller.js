import  user from '../model/user'
import { isValid, isValidBody, isValidPassword, isValidSyntaxOfEmail } from '../validation/validator'
const jwt = require('jsonwebtoken')


export const createuser = async function (request ,response){
    try {

        let data = request.body

        let {name,email,password} = data

        if (!isValidBody(data)) return res.status(400).send({ status: true, message: "Body can't be Empty!" })

        if (!name) return res.status(400).send({ status: false, message: " Name is Mandatory" })
        if (!isValid(name)) return res.status(400).send({ status: false, message: "Name contains only letters" })

        if (!email) return res.status(400).send({ status: false, message: "Email is Mandatory" })
        if (!isValidSyntaxOfEmail(email.trim())) return res.status(400).send({ status: false, message: "Email is in Invalid Format" })

        let duplicateEmail = await user.findOne({ email: email })
        if (duplicateEmail) return res.status(409).send({ status: false, message: `User is already registered with ${email} Email` })
        
        if (!password) return res.status(400).send({ status: false, message: "Password is Mandatory" })
        if (!isValidPassword(password)) return res.status(400).send({ status: false, message: "Password length should be between 8-15" })


        const create = await user.create(data)
        return res.status(201).send({statis:true ,msg:"data create sucessfully", data:create})      
        
    } catch (error) {
        return response.status(500).json(error.message);  
    }
}

export let login = async function (req, res) {

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
        if (!isValidSyntaxOfEmail(email)) {
            return res.status(400).send({ msg: `Email is invalid`, status: false })
        }
        if (!isValidPassword(password)) {
            return res.status(400).send({ msg: "Password is invalid", status : false})
        }

        let user = await user.findOne({ email: email, password: password });
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
 


