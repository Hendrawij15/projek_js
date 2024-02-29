const { where } = require('sequelize');
const db = require ('../models');
const Product = db.products;


const Op = db.Sequelize.Op;

//Buat PRODUCT

exports.createProduct = (req,res)=>{
    //validari request
    if(!req.body.name){
        res.status(400).send({
            message: " kolom tidak boleh kosong"
        });
        return;
    }

    //create
    const product = {
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        stock:req.body.stock,
        categoryId: req.body.categoryId
    }

    //menyimpan database
    Product.create(product).then(data=>{
        res.send(data)
    }).catch(err=>{
        res.status(500).send({
            message:err.message || "ada error"
        })
    })
}

//GetALL
exports.findallProduct = (req,res)=>{
    const name =req.query.name;
    var condition = name?{name: {[Op.like]:`%${name}%`}}:null; //berfungsi untuk searching

    Product.findAll({
        whare:condition,
        include:[
            "categories",
        ]
    }).then(data =>{
        res.send(data);
        
    }).catch(err=>{
        res.status(500).send({
            message : err.message || "ada error"
        });

})
}

//UPDATE USER
exports.updateProduct = (req,res)=>{
    const id = req.params.id
    Product.update(req.body,{
        where: {id:id}
    }).then(num=>{
        if(num == 1){
            res.send({
                message: "Update UservBerhasil"
            });
        }else{
            res.send({
                message:"update User gagal"
            })
        }
    }).catch(err=>{
        res.status(500).send({
            message : err.message || "ada error"
        });

})
}

//HAPUS PRODUCT
exports.deleteProduct = (req,res)=>{
    const id = req.params.id
    Product.destroy({
        where:{id:id}
    }).then(num=>{
        if(num == 1){
            res.send({
                message: "Hapus Product Berhasil"
            });
        }else{
            res.send({
                message:"Product tidak bisa dihapus"
            })
        }
    }).catch(err=>{
        res.status(500).send({
            message : err.message || "gagal menghapus. server error"
        });

    })
}

