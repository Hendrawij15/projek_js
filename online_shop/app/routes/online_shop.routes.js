module.exports = app =>{
    var router = require("express").Router(); //fasilitas express
    const users = require ("../controllers/users.controllers.js")
    const roles = require ("../controllers/roles.controllers.js")
    const products = require ("../controllers/products.controllers.js")
    const categories = require ("../controllers/categories.controllers.js")

    //MENU USER
    router.post('/users',users.createUser);//BUAT USER
    router.get("/users",users.findallUser);//LIHAT SEMUA USER
    router.put("/users/:id",users.updateUser);//UPDATE USER
    router.delete("/users/:id",users.deleteUser);//HAPUS USER

    //MENU ROLE
    router.post('/roles',roles.createRole);//BUAT ROLE
    router.get("/roles",roles.findallRole);//LIHAT ROLE
    router.put("/roles/:id",roles.updateRole);//UPDATE ROLE
    router.delete("/roles/:id",roles.deleteRole);//HAPUS ROLE

    //MENU PRODUCT
    router.post('/products',products.createProduct);//BUAT PRODUCT
    router.get("/products",products.findallProduct);//LIHAT PRODUCT
    router.put("/products:id",products.updateProduct);//UPDATE PRODUCT
    router.delete("/products/:id",products.deleteProduct);//HAPUS PRODUCT

    //MENU CATEGORIE
    router.post('/categories',categories.createCategorie);//BUAT KATEGORI
    router.get("/categories",categories.findallCategorie);//LIHAT KATEGORI
    router.put("/categories/:id",categories.updateCategorie);//UPDATE KATEGORI
    router.delete("/categories/:id",categories.deleteCategorie);//HAPUS KATEGORI


    app.use("/api/onlineshop/",router)
}