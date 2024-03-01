
import { validationResult } from "express-validator";
import { logger } from '../logger/index.js';

import mysql from "mysql";


// MySQL connection configuration
const connection = mysql.createConnection({
    host: 'localhost', // Change this to your MySQL host
    user: 'root',      // Change this to your MySQL username
    password: '',      // Change this to your MySQL password
    database: 'basic-crud-db' // Change this to your MySQL database name
});
  
// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
});



// end point for User Sign Up by POST request /register
const newPost = async (req, res) => {

    // checking if there any error like short password or wrong email
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: "Please fill all the required details correctly !", errors: errors.array() });
    }

    try {
        const title=req.body.title.trim();
        const description=req.body.description.trim();
        const userId=req.body.user_id;

        // Check for duplicate description id
        connection.query("SELECT id FROM users WHERE id='"+userId+"' Limit 1", (error, results) => {

            if (error) {
              console.error('Error executing query:', error);
              return res.status(501).json({ success: false, message: "Internal server error", error: error });
            }


            if(results.length==0){
                return res.status(201).json({ success: false, message: "User not found.", error: [] });
            }
           


            // now we can start creating user account
            connection.query("INSERT INTO posts SET ?", { title: title, description: description, user_id: userId }, (error, results) => {

                if (error) {
                    console.error('Error executing query:', error);
                    return res.status(501).json({ success: false, message: "Internal server error", error: error });
                }
            
                if (results.affectedRows === 0) {
                    // No rows were inserted
                    return res.status(500).json({ success: false, message: "Failed to create post. Please try again.", error: [] });
                }
            
                // Account created successfully
                return res.status(201).json({ success: true, message: "Post created!", post_id: results.insertId });
            });
            
        });
        
    } catch (error) {
        return res.status(400).json({ success: false, message: "Internal server error", long_message: error.message });
    }
};

// end point for user edit
const updatePost = async (req, res) => {


    // checking if there any error like short password or wrong email
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: "Please fill all the required details correctly !", errors: errors.array() });
    }

    try {
        const postId = req.params.post_id;
        const title=req.body.title.trim();
        const description=req.body.description.trim();
        const userId=req.body.user_id;

        // Updating user account using parameterized query
        connection.query("UPDATE posts SET title = ?, description = ? WHERE id = ? and user_id= ?", [title, description,postId, userId], (error, results) => {
            if(error) {
                console.error('Error executing query:', error);
                return res.status(501).json({ success: false, message: "Internal server error", error: error });
            }
        
            if (results.affectedRows === 0) {
                // No rows were updated
                return res.status(500).json({ success: false, message: "Post not found", error: [] });
            }
        
            // Post updated successfully
            return res.status(201).json({ success: true, message: "Post updated!" });
        });

        
        
    } catch (error) {
        return res.status(400).json({ success: false, message: "Internal server error", long_message: error.message });
    }
};

// end point for getting Single User details using GET request
const fetchPost = (async (req, res) => {
    try {
        const postId = req.params.post_id;
        const userId = req.body.user_id;


        connection.query("SELECT * FROM posts WHERE id= ? and user_id= ? LIMIT 1", [postId, userId], (error, results) => {

            if (error) {
              console.error('Error executing query:', error);
              return res.status(501).json({ success: false, message: "Internal server error", error: error });
            }

            if(results.length==0){
                return res.status(201).json({ success: false, message: "No post found.", error: [] });
            }

            
            // Close the connection if needed
            return res.status(200).json({ success: true, message: "post data fetched", data: results[0], error: [] });
        });
    } catch (error) {
        logger.error(JSON.stringify({ file: "user_controller/fetchPost", error: error, message: "An error occurred while fetching the userDetails" }));
            
        return res.status(501).json({ success: false, message: "Internal server error"})
    }
});

// end point for delete user
const deletePost = async (req, res) => {

    // checking if there any error like short password or wrong email
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({ success: false, message: "Please fill all the required details correctly !", errors: errors.array() });
    }



    try {
        const postId = req.params.post_id;
        const userId = req.body.user_id;

        connection.query("DELETE FROM posts WHERE id = ? and user_id=? ", [postId,userId], (error, results) => {

            if (error) {
              console.error('Error executing query:', error);
              return res.status(501).json({ success: false, message: "Internal server error", error: error });
            }

            if(results.affectedRows==0){
                return res.status(201).json({ success: false, message: "No post found.", error: [] });
            }
            
            return res.status(200).json({ success: true, message: "Post deleted successfully", post_id: postId, error: [] });
        });

    } catch (error) {
        logger.error(JSON.stringify({ file: "user_controller/deleteUser", error: error, message: "An error occurred while fetching the userDetails" }));
            
        return res.status(501).json({ success: false, message: "Internal server error"})
    }

}


// to generate email tokens
function fetchAllPost(req,res) {
    const userId = req.body.user_id;

    connection.query('SELECT * FROM posts where user_id=? ',[userId], (error, results) => {

        if (error) {
          console.error('Error executing query:', error);
          return res.status(501).json({ success: false, message: "Internal server error", error: error });
        }
        
        // Close the connection if needed
        return res.status(200).json({ success: true, message: "Data fetched", data: results, error: [] });
    });
    
}


const PostController = {
    fetchAllPost,
    fetchPost,
    newPost,
    updatePost,
    deletePost,
};

export default PostController;