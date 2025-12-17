import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('myapp', 'root', '', {
    host: 'localhost',
    dialect: 'mysql' // or 'postgres', 'sqlite', 'mssql'
});

const User = sequelize.define('User', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false  
    }, 
    //define user role by default to 'user'

    role : {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'User'
    },
    lastLogin : {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date()
    }
}, {
    // Other model options go here
    tableName: 'users',
    timestamps: false
});

// Export the model
export { User, sequelize };