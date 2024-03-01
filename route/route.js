import express from "express";
import UserController from "../controller/user_controller.js";
import PostController from "../controller/post_controller.js";
import { body } from "express-validator";

const route=express.Router();

route.get('/',(req,res)=>{
    return res.status(201).json({message:"Welcome to Crud App"});
});


// GET /users -> get list of all users
route.get('/users', UserController.fetchAllUser);

// GET /users/:user_id -> get details of specific user by user id
route.get('/users/:user_id', UserController.fetchUser);

// GET /users/:user_id/posts/:post_id -> get details of specific user by specific posts
route.get('/users/:user_id/posts', UserController.fetchUserPosts);

// GET /users/:user_id/posts/:post_id -> get details of specific user by specific posts
route.get('/users/:user_id/posts/:post_id', UserController.fetchUserPost);

// GET /users/:user_id /posts -> get details of specific user by posts
route.delete('/users/:user_id/posts/:post_id', UserController.deleteUserPost);

// POST /users -> create new user 
route.post('/users', [
    body('name', 'Please enter a valid name with at least 3 characters').isLength({ min: 3 }),
    body('email', 'Please enter a valid email').isEmail(),
    body('age', 'Please enter a valid age').isInt({ min: 0 })
], UserController.registerUser);

// PUT /users/:user_id -> edit existing user 
route.put('/users/:user_id', [
    body('name', 'Please enter a valid name with at least 3 characters').isLength({ min: 3 }),
    body('email', 'Please enter a valid email').isEmail(),
    body('age', 'Please enter a valid age').isInt({ min: 0 })
], UserController.updateUser);

// DELETE /users/:user_id -> delete existing user
route.delete('/users/:user_id', UserController.deleteUser);


// end of user end point


// post end points

// GET /posts -> get list of all posts
route.get('/posts', PostController.fetchAllPost);  // show all post without user id without user id required

// GET /posts/{post_id} -> get details of specific post by post id
route.get('/posts/:post_id', PostController.fetchPost); // show post directly without user id required

// POST /posts -> create new post
route.post('/posts', [
    body('user_id', 'Please enter a valid user id').isInt({ min: 1 }),
    body('title', 'Please enter a valid title').isLength(5),
    body('description', 'Please enter a description').isLength({ min: 10 })
], PostController.newPost);

// PUT /posts/{post_id} -> edit existing post
route.put('/posts/:post_id', [
    body('user_id', 'Please enter a valid user id').isInt({ min: 1 }),
    body('title', 'Please enter a valid title').isLength(5),
    body('description', 'Please enter a description').isLength({ min: 10 })
], PostController.updatePost);

// DELETE /posts/{post_id} -> edit existing post
route.delete('/posts/:post_id', PostController.deletePost);  // delete post directly without user id required


export {route};