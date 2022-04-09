import express from 'express'
import { login, register } from '../controllers/user.js'
import Joi from 'joi';
import JoiValidator from 'express-joi-validation'
import { verifyToken } from '../middleware/auth.js';
const validator = JoiValidator.createValidator({})
const registerSchema = Joi.object({
    username : Joi.string().min(3).max(15).required(),
    password : Joi.string().min(3).max(8).required(),
    email : Joi.string().email().required(),
})

const loginSchema = Joi.object({
    password : Joi.string().min(3).max(8).required(),
    email : Joi.string().email().required(),
})
const router = express.Router()

router.get('/test',verifyToken, (req, res)=>{
    res.send("api live")
})

router.post('/register', verifyToken,  validator.body(registerSchema), register)
router.post('/login',validator.body(loginSchema), login)

export default router;
