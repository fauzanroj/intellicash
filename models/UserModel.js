import { Sequelize } from "sequelize";
import db from "../config/database.js";

const Users = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
    },
    password: {
        allowNull: false,
        type: Sequelize.STRING
    },
    refresh_token: {
        type: Sequelize.TEXT
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }
}, {
    freezeTableName: true
});

export default Users;
