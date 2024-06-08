const jwt = require('jsonwebtoken')


const jwtMiddlewareFun = (req, res, next) => {
    console.log("inside jwtMiddleware");

    try {
        const token = req.headers.authorization.split(" ")[1]
        if (token) {
            const result = jwt.verify(token, process.env.secret_key)
            console.log(result);
            req.payload = result.userId
            next()
        }
        else {
            res.status(406).json("Please login first")
        }
    }
    catch {
        res.status(406).json("Please login ")

    }

}

module.exports = jwtMiddlewareFun 