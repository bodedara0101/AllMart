import { DataTypes, Sequelize } from "sequelize";
import { User } from "./users.model.js";

const productSync = new Sequelize('myapp', 'root', '', {
    host: 'localhost',
    dialect: 'mysql' // or 'postgres', 'sqlite', 'mssql'
});

const Product = productSync.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  }, 
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  }, 
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "all"
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 5 
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
    onDelete: "CASCADE", // If user is deleted, delete associated products
  },
},{
  tableName: "products",
  timestamps: false,
});

// Define Associations
User.hasMany(Product, { foreignKey: "userId" });
Product.belongsTo(User, { foreignKey: "userId" });

export {Product,productSync};