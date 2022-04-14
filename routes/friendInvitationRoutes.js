import express from 'express'
import JoiValidator from 'express-joi-validation'
import { verifyToken } from '../middleware/auth.js';
import { friendRequestPostSchema, friendRequestAcceptPostSchema} from "../helpers/middlewareHelpers.js"
import { postInvite, postAccept, postReject } from '../controllers/friendsInvitation.js';
const validator = JoiValidator.createValidator({})

const router = express.Router()

router.post('/invite', verifyToken, validator.body(friendRequestPostSchema), postInvite)
router.post('/accept', verifyToken, validator.body(friendRequestAcceptPostSchema), postAccept)
router.post('/reject', verifyToken, validator.body(friendRequestAcceptPostSchema), postReject)

export default router