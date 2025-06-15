import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
} from "../controllers/authController.js";
const router = express.Router();


router.post('/register', registerController);

router.post('/login', loginController)

router.post('/forgot-password', forgotPasswordController);

router.get('/test',requireSignIn,isAdmin, testController);

router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});

router.get('/admin-auth', requireSignIn,isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});

router.put('/profile', requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);
export default router;