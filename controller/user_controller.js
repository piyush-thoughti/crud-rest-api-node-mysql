
import { validationResult } from "express-validator";
import { logger } from '../logger/index.js';
import User from '../models/User.js';


const UserController = {
    
    // end point for new user 
    registerUser: async (req, res) => {

        // checking if there any error like short password or wrong email
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: "Please fill all the required details correctly !", errors: errors.array() });
        }

        try {
            const name = req.body.name.trim();
            const email = req.body.email.trim();
            const age = req.body.age;


            // Check for duplicate email id
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(201).json({ success: false, message: "Email already exists.", error: [] });
            }

            // Create user account
            const newUser = await User.create({ name, email, age });
            if (!newUser) {
                return res.status(500).json({ success: false, message: "Failed to create account. Please try again.", error: [] });
            }

            // Account created successfully
            return res.status(201).json({ success: true, message: "Account created!", user_id: newUser.id });
        } catch (error) {
            return res.status(400).json({ success: false, message: "Internal server error", long_message: error.message });
        }
    },

    // end point for user edit
    updateUser: async (req, res) => {
        // Checking if there are any errors like short password or wrong email
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: "Please fill all the required details correctly !", errors: errors.array() });
        }


        try {
            const userId = req.params.user_id;
            const name = req.body.name.trim();
            const email = req.body.email.trim();
            const age = req.body.age;

            // Find user by ID
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found", error: [] });
            }

            // Check for duplicate email id
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(201).json({ success: false, message: "Email already exists.", error: [] });
            }


            // Update user account
            await user.update({ name, email, age });

            // Account updated successfully
            return res.status(201).json({ success: true, message: "Account updated!", user: user });
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ success: false, message: "Internal server error", long_message: error.message });
        }
    },

    // Endpoint for delete user
    deleteUser: async (req, res) => {
        // Checking if there are any errors like short password or wrong email
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: "Please fill all the required details correctly !", errors: errors.array() });
        }

        try {
            const userId = req.params.user_id;

            // Deleting user
            const deletedRowCount = await User.destroy({ where: { id: userId } });
            if (deletedRowCount === 0) {
                return res.status(404).json({ success: false, message: "No user found.", error: [] });
            }

            // User deleted successfully
            return res.status(200).json({ success: true, message: "User deleted successfully", user_id: userId, error: [] });
        } catch (error) {
            console.error('Error:', error);
            logger.error(JSON.stringify({ file: "user_controller/deleteUser", error: error, message: "An error occurred while deleting the user" }));
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    },

    // Endpoint for getting Single User details using GET request
    fetchUser: async (req, res) => {
        try {
            const userId = req.params.user_id;

            // Fetching user details
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ success: false, message: "No user found.", error: [] });
            }

            // User data fetched successfully
            return res.status(200).json({ success: true, message: "User data fetched", data: user, error: [] });

        } catch (error) {
            logger.error(JSON.stringify({ file: "user_controller/fetchUser", error: error, message: "An error occurred while fetching the userDetails" }));
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    },

    // to fetch all user
    fetchAllUser: async (req, res) => {

        try {
            // Fetching user details
            const users = await User.findAll();
            if (!users) {
                return res.status(404).json({ success: false, message: "No user found.", error: [] });
            }
            // Users data fetched successfully
            return res.status(200).json({ success: true, message: "Data fetched", data: users, error: [] });


        } catch (error) {
            logger.error(JSON.stringify({ file: "user_controller/fetchUser", error: error, message: "An error occurred while fetching the userDetails" }));
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    },

};


export default UserController;