const { validateUser} = require('../utils/validation');
const UserSchema = require('../models/user.model');
const {hashPass} = require('../utils/password');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn : process.env.JWT_TIME_LIMIT
    })
}

const userRegister = async (req, res, next) => {
    try {
        const {error, value} = validateUser(req.body);
        if(error) {
            return res.status(406).json({
                msg:'Not valid data'
            })
        }
        const {username, password} = value;
        const hashedPassword = await hashPass(password);
        const usernameExists = await UserSchema.findOne({username:username});
        if(usernameExists) {
            return res.json({
                status: false,
                code:"00",
                msg:"Username already exists"
            });
        }
        const newUser = new UserSchema({
            username:username,
            password:hashedPassword
        });
        const savedUser = await newUser.save();
        const token = signToken(newUser._id);
        console.log("New User registered successfully");
        res.status(201).json({
            data: {
                token,
                username : savedUser.username,
                id: savedUser._id
            }
        })
    } catch (error) {
        console.log(error,"Registration could not be moeved forward");
        res.status(403).json({
            status:false,
            msg:"User could not be added"
        })
    }
}

const userLogin = async (req, res, next) => {
    try {
        const {username, password} = req.body;
        const user = await UserSchema.findOne({username});
        if(!user) {
            return res.status(401).json({
                status:false,
                msg:"Invalid Credentials"
            });
        }
        const hashedPassword = user.password;

        const isPasswordValid = await bcrypt.compare(password, hashedPassword);

        if(!isPasswordValid) {
            return res.status(401).json({
                status:false,
                msg:"Invalid Credentials"
            });
        }

        const token = signToken(user._id);

        return res.status(200).json({
            status: true,
            token
        })
    } catch (error) {
        console.log(error,"Can't Login");
        res.status(403).json({
            status:false,
            msg:"Can't login"
        })
    }
}

const protect = async (req, res, next) => {
    try {
        let token = null;
        if(req.headers.auth && req.headers.auth.startsWith('Bearer')) {
            token = req.headers.auth.split(' ')[1];
        }
        if(!token) {
            throw new Error("You are not logged in!");
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, id) => {
            if(err) {
              throw new Error("Invalid Creds")
            }
            req.userId = id;
            next();
        })
    } catch (error) {
        console.log(error,"Authentication Error");
        res.status(403).send({
            status:false,
            msg: error.message
        })
    }
}

module.exports = {
    userRegister,
    userLogin,
    protect
}
