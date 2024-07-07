import express from 'express'
import { getUserResume, newUserResume } from '../controller/user.controller.js';

const router = express.Router();

router.post('/getresume', getUserResume);
router.post('/resume', newUserResume);

export default router;