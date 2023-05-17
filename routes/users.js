import express from "express"
import { login, signup ,loginOtp} from "../controllers/auth.js";
import { getAllUsers, updateProfile } from '../controllers/users.js'

const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)
router.post('/loginOtp', loginOtp)

router.get('/getAllUsers', getAllUsers)
router.patch('/update/:id', updateProfile)

export default router