const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require("dotenv");
dotenv.config();

//Running first when access user's info page, such as /user/me url
const auth = async(req, res, next) => {
    console.log(req.header('Authorization'));
    console.log("fdf" + req);
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
        //Split token sent to object data
        const data = jwt.verify(token, process.env.JWT_KEY)
        //Check data info with info saved in database
        const user = await User.findOne({_id: data._id, 'tokens.token': token});
        if (!user) {
            throw new Error();
        }
        // req.user = user;
        // req.token = token;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource'});
    }
}

module.exports = auth;