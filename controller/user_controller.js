
import { validationResult } from "express-validator";
import { logger } from '../logger/index.js';

// post_controller.js
import createConnection from './db.js';

// Create MySQL connection
const connection = createConnection();


// end point for User Sign Up by POST request /register
const registerUser = async (req, res) => {


    // checking if there any error like short password or wrong email
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: "Please fill all the required details correctly !", errors: errors.array() });
    }

    try {
        const name=req.body.name.trim();
        const email=req.body.email.trim();
        const age=req.body.age;

        // Check for duplicate email id
        connection.query("SELECT id FROM users WHERE email='"+email+"' Limit 1", (error, results) => {

            if (error) {
              console.error('Error executing query:', error);
              return res.status(501).json({ success: false, message: "Internal server error", error: error });
            }

            

            if(results.length>0){
                return res.status(201).json({ success: false, message: "Email already exist.", error: [] });
            }
           


            // now we can start creating user account
            connection.query("INSERT INTO users SET ?", { name: name, email: email, age: age }, (error, results) => {
                if (error) {
                    console.error('Error executing query:', error);
                    return res.status(501).json({ success: false, message: "Internal server error", error: error });
                }
            
                if (results.affectedRows === 0) {
                    // No rows were inserted
                    return res.status(500).json({ success: false, message: "Failed to create account. Please try again.", error: [] });
                }
            
                // Account created successfully
                return res.status(201).json({ success: true, message: "Account created!", user_id: results.insertId });
            });
            
        });
        
    } catch (error) {
        return res.status(400).json({ success: false, message: "Internal server error", long_message: error.message });
    }
};

// end point for user edit
const updateUser = async (req, res) => {


    // checking if there any error like short password or wrong email
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: "Please fill all the required details correctly !", errors: errors.array() });
    }

    try {
        const userId = req.params.user_id;
        const name=req.body.name.trim();
        const email=req.body.email.trim();
        const age=req.body.age;

        // Updating user account using parameterized query
        connection.query("UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?", [name, email, age, userId], (error, results) => {
            if (error) {
                console.error('Error executing query:', error);
                return res.status(501).json({ success: false, message: "Internal server error", error: error });
            }
        
            if (results.affectedRows === 0) {
                // No rows were updated
                return res.status(500).json({ success: false, message: "User not found", error: [] });
            }
        
            // Account updated successfully
            return res.status(201).json({ success: true, message: "Account updated!" });
        });
        
    } catch (error) {
        return res.status(400).json({ success: false, message: "Internal server error", long_message: error.message });
    }
};


// end point for getting Single User details using GET request
const fetchUser = (async (req, res) => {
    try {
        const userId = req.params.user_id;
        connection.query("SELECT * FROM users WHERE id= ? LIMIT 1", [userId], (error, results) => {

            if (error) {
              console.error('Error executing query:', error);
              return res.status(501).json({ success: false, message: "Internal server error", error: error });
            }

            if(results.length==0){
                return res.status(201).json({ success: false, message: "No user found.", error: [] });
            }

            
            // Close the connection if needed
            return res.status(200).json({ success: true, message: "User data fetched", data: results[0], error: [] });
        });
    } catch (error) {
        logger.error(JSON.stringify({ file: "user_controller/fetchUser", error: error, message: "An error occurred while fetching the userDetails" }));
            
        return res.status(501).json({ success: false, message: "Internal server error"})
    }
});

// end point for delete user
const deleteUser = async (req, res) => {

    // checking if there any error like short password or wrong email
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({ success: false, message: "Please fill all the required details correctly !", errors: errors.array() });
    }

    try {
        const userId = req.params.user_id;
        connection.query("DELETE FROM users WHERE id = ?", [userId], (error, results) => {

            if (error) {
              console.error('Error executing query:', error);
              return res.status(501).json({ success: false, message: "Internal server error", error: error });
            }

            if(results.affectedRows==0){
                return res.status(201).json({ success: false, message: "No user found.", error: [] });
            }

            
            return res.status(200).json({ success: true, message: "User deleted successfully", user_id: userId, error: [] });
        });
    } catch (error) {
        logger.error(JSON.stringify({ file: "user_controller/deleteUser", error: error, message: "An error occurred while fetching the userDetails" }));
            
        return res.status(501).json({ success: false, message: "Internal server error"})
    }

}


// to generate email tokens
function fetchAllUser(req,res) {

    connection.query('SELECT * FROM users', (error, results) => {

        if (error) {
          console.error('Error executing query:', error);
          return res.status(501).json({ success: false, message: "Internal server error", error: error });
        }
        
        // Close the connection if needed
        return res.status(200).json({ success: true, message: "Data fetched", data: results, error: [] });
    });
    
}


const UserController = {
    fetchAllUser,
    fetchUser,
    registerUser,
    updateUser,
    deleteUser,
};

export default UserController;