// models/User.js
import { Sequelize } from 'sequelize';
import sequelize from '../db/db.js';

const User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    timestamps: false, // Disabled timestamps
    paranoid: true, // Enable soft deletes
    underscored: true, // Use snake_case for column names
    tableName: 'users' // Specify the table name if it's different from the model name
});



export default User;
