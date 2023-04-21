const jwt = require('jsonwebtoken')


const authentication = async function (req, res, next) {
    try {

        //=====================Check Presence of Key with Value in Header=====================//
        let token = req.headers['x-api-key']
        if (!token) { return res.status(400).send({ status: false, msg: "Token must be Present." }) }

        //=====================Verify token & asigning it's value in request body =====================//
        jwt.verify(token, "This is secret key", function (error, decodedToken) {
            if (error) {
                return res.status(401).send({ status: false, msg: "Token is not valid" })
            } else {
                req.token = decodedToken

                next()

            }
        })

    }
    catch (error) {

        res.status(500).send({ status: false, msg: error.message })
    }
}

  module.exports = {authentication}
  