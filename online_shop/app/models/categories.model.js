module.exports = (sequelize,Sequelize)=>{
    const Categorie = sequelize.define("categories",{
        name:{
            type: Sequelize.STRING
        },
        description:{
            type: Sequelize.STRING
        }

});
return Categorie;
}