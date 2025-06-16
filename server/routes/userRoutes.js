import express from 'express';
import auth from '../middleware/auth.js';
import {  getAllBlogsUser, getAllCommentsUser, getUserDashboard, userLogin, userSignup } from '../controllers/userControllers.js';
import UserAuth from '../middleware/UserAuth.js';
import { getBlogComments } from '../controllers/blogControllers.js';
import { getAllComments } from '../controllers/adminControllers.js';

const userRouter = express.Router();

userRouter.post("/signup", userSignup);//
userRouter.post("/login", userLogin);//
userRouter.get("/blogs", UserAuth, getAllBlogsUser);
userRouter.get("/comments", UserAuth, getAllCommentsUser);

userRouter.get("/dashboard", UserAuth, getUserDashboard);





// adminRouter.get("/comments", auth, getAllComments);
// adminRouter.get("/blogs", auth, getAllBlogsAdmin);
// adminRouter.post("/delete-comment", auth, deleteCommentById);
// adminRouter.post("/approve-comment", auth, approveCommentById);
// adminRouter.get("/dashboard", auth, getDashboard);


export default userRouter;