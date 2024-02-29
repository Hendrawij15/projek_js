const dbConfig = require('../config/db.config.js')
const Sequelize = require('sequelize')
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    { //host dan dialect dipisah//
        host: dbConfig.HOST,
        dialect: dbConfig.dialect
    }
)
const db = {};
db.Sequelize = Sequelize;//?
db.sequelize = sequelize;//?

db.users = require('./user.model.js')(sequelize,Sequelize)
db.roles = require('./role.model.js')(sequelize,Sequelize)
db.products = require('./product.models.js')(sequelize,Sequelize)
db.categories = require('./categories.model.js')(sequelize,Sequelize)

//RELASI USER AND ROLES
db.roles.hasMany(db.users,{
    as: "product"
});
db.users.belongsTo(db.roles,{
    foreignKey: "roleId",
    as:"roles"
});

//RELASI CATEGORY AND PRODUCT
db.categories.hasMany(db.products,{
    as: "products"
});
db.products.belongsTo(db.categories,{
    foreignKey: "categoryId",
    as:"categories"
});

module.exports = db;