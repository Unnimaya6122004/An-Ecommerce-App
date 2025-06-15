import express from 'express';
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from '../controllers/categoryController.js';
import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();




router.post('/create-category',requireSignIn,isAdmin,createCategoryController);



router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController);

router.get('/get-category',categoryController)
router.get('/single-category/:slug',singleCategoryController)
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController);
export default router;