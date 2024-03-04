
import { validationResult } from "express-validator";
import { logger } from '../logger/index.js';
import Post from '../models/Post.js';
import User from '../models/User.js';
import sequelize from '../db/db.js';
import {Op} from 'sequelize';
const PostController = {

    // end point for creating new post
    newPost: async (req, res) => {

        // checking if there any error like short password or wrong email
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: "Please fill all the required details correctly !", errors: errors.array() });
        }

        try {
            const title = req.body.title.trim();
            const description = req.body.description.trim();
            const userId = req.body.user_id;
 
            // Check if the user exists
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found.", error: [] });
            }

            
            // Check if the post exists with the same title
            const same_post = await Post.findOne({
                where: {
                    title: sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), sequelize.fn('LOWER', title)), // title is case insensitive
                    user_id: userId
                }
            });
            
            if (same_post) {
                // user can not create a post with same title
                return res.status(404).json({ success: false, message: "One or more posts exist with the same title.", error: [] });
            }


            // Create the post
            const newPost = await Post.create({
                title: title.trim(), 
                description: description.trim(),
                user_id: userId
            });

            // Respond with the created post
            return res.status(201).json({ success: true, message: "Post created!", post_id: newPost.id });

        } catch (error) {
            return res.status(400).json({ success: false, message: "Internal server error", long_message: error.message });
        }
    },

    // end point for post edit
    updatePost: async (req, res) => {
        // checking if there any error like short password or wrong email
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: "Please fill all the required details correctly !", errors: errors.array() });
        }

        try {
            const postId = req.params.post_id;
            const title = req.body.title.trim();
            const description = req.body.description.trim();
            const userId = req.body.user_id;

            // Check if the user exists
            const post = await Post.findByPk(postId);
            if (!post) {
                return res.status(404).json({ success: false, message: "Post not found.", error: [] });
            }


            // Check if the post exists with the same title
            const same_post = await Post.findOne({
                where: {
                    title: sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), sequelize.fn('LOWER', title)), // title is case insensitive
                    user_id: userId,
                    id: { [Op.ne]: postId } 
                }
            });
            
            if (same_post) {
                // user can not create a post with same title
                return res.status(404).json({ success: false, message: "One or more posts exist with the same title.", error: [] });
            }

            

            if (post.user_id != userId) {
                return res.status(401).json({ success: false, message: "You do not have access for this post.", error: [] });
            }

            // update title and description
            await post.update({ title: title, description: description });

            // Post updated successfully
            return res.status(201).json({ success: true, message: "Post updated!", post:post });

        } catch (error) {
            return res.status(400).json({ success: false, message: "Internal server error", long_message: error.message });
        }
    },

    // end point for delete post
    deletePost: async (req, res) => {

        // checking if there any error like short password or wrong email
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({ success: false, message: "Please fill all the required details correctly !", errors: errors.array() });
        }



        try {
            const postId = req.params.post_id;
           
           
            // Deleting user
            const deletedRowCount = await Post.destroy({ where: { id: postId } });
            if (deletedRowCount === 0) {
                return res.status(404).json({ success: false, message: "Post not found.", error: [] });
            }

            return res.status(200).json({ success: true, message: "Post deleted successfully", post_id: postId, error: [] });

        } catch (error) {
            logger.error(JSON.stringify({ file: "user_controller/deleteUser", error: error, message: "An error occurred while fetching the userDetails" }));

            return res.status(501).json({ success: false, message: "Internal server error" })
        }

    },

    // end point for getting Single post
    fetchPost: async (req, res) => {
        try {
            const postId = req.params.post_id;

            const post = await Post.findOne({
                where: {
                    id: postId,
                },
                attributes: ['id', 'title', 'description', 'created_at'], 
                include: [{ model: User, attributes: ['id', 'name', 'email', 'created_at'] }] // fetching user also with post 
            });

            if (!post) {
                return res.status(404).json({ success: false, message: "Post not found.", error: [] });
            }

            return res.status(200).json({ success: true, message: "post data fetched", data: post, error: [] });

        } catch (error) {
            logger.error(JSON.stringify({ file: "user_controller/fetchPost", error: error, message: "An error occurred while fetching the userDetails" }));

            return res.status(501).json({ success: false, message: "Internal server error" })
        }
    },

    // endpoint to fetch all post
    fetchAllPost: async (req, res) => {

        const posts = await Post.findAll({
            attributes: ['id', 'title', 'description', 'created_at'], 
            include: [{ model: User, attributes: ['id', 'name', 'email', 'created_at'] }] // fetching user also with post 
        });

        if (!posts) {
            return res.status(404).json({ success: false, message: "Post not found.", error: [] });
        }

        return res.status(200).json({ success: true, message: "post data fetched", data: posts, error: [] });
    },
    
};


export default PostController;