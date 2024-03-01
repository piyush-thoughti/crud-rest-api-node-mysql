// models/Post.js
import { Sequelize } from 'sequelize';
import sequelize from '../db/db.js';
import User from './User.js'; // Import the User model


const Post = sequelize.define('posts', {
    // Define your post model fields here
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User, // Reference the User model
            key: 'id' // Reference the id field in the User model
        }
    }
}, {
    // Define options for the model
    paranoid: true, // Enable soft deletes
    timestamps: true, // Enable timestamps
    underscored: true, // Use snake_case for column names
    tableName: 'posts' // Specify the table name if it's different from the model name
});

export default Post;
