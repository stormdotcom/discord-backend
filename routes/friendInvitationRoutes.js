import express from 'express'
import JoiValidator from 'express-joi-validation'
import { verifyToken } from '../middleware/auth.js';
import { friendRequestPostSchema} from "../helpers/middlewareHelpers.js"
import { postInvite } from '../controllers/friendsInvitation.js';
const validator = JoiValidator.createValidator({})

const router = express.Router()

router.post('/invite', verifyToken, validator.body(friendRequestPostSchema), postInvite)

export default router