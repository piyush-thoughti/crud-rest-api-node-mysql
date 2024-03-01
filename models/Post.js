import { Sequelize } from 'sequelize';
import sequelize from '../db/db.js';
import User from './User.js'; 


const Post = sequelize.define('posts', {
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
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    deleted_at: {
        type: Sequelize.DATE,
        allowNull: true
    }
}, {
    
    paranoid: true, // Enable soft deletes
    timestamps: false, // Disabled timestamps
    underscored: true, 
    tableName: 'posts',
    indexes: [
        { 
            // title and user id must be unique for each user 
            unique: true,
            name: 'unique_title_per_user',
            fields: ['title', 'user_id'],
            msg: 'Title must be unique per user'
        }
    ]
});


// relationship with user table
Post.belongsTo(User, { foreignKey: 'user_id' });

export default Post;
