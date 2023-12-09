import  Express from "express";
// import { verifyToken } from "../middleware/VerifyToken.js";
import { getUsers, Register, Login } from "../controllers/users.js";
// import { refreshToken } from "../controllers/RefreshToken.js";
const router = Express.Router();

router.get('/users', getUsers);
router.post('/users', Register);
router.post('/login', Login);
// router.get('/token', refreshToken);

export default router;