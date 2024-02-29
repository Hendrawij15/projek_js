const { where } = require('sequelize');
const db = require ('../models');
const Categorie = db.categories;


const Op = db.Sequelize.Op;

//Buat PRODUCT

exports.createCategorie = (req,res)=>{
    //validari request
    if(!req.body.name){
        res.status(400).send({
            message: " kolom tidak boleh kosong"
        });
        return;
    }

    //create
    const category = {
        name:req.body.name,
        description:req.body.description
    }

    //menyimpan database
    Categorie.create(category).then(data=>{
        res.send(data)
    }).catch(err=>{
        res.status(500).send({
            message:err.message || "ada error"
        })
    })
}

//GetALL
exports.findallCategorie = (req,res)=>{
    const name =req.query.name;
    var condition = name?{name: {[Op.like]:`%${name}%`}}:null; //berfungsi untuk searching

    Categorie.findAll({
        whare:condition,
    }).then(data =>{
        res.send(data);
        
    }).catch(err=>{
        res.status(500).send({
            message : err.message || "ada error"
        });

})
}

//UPDATE USER
exports.updateCategorie = (req,res)=>{
    const id = req.params.id
    Role.update(req.body,{
        where: {id:id}
    }).then(num=>{
        if(num == 1){
            res.send({
                message: "Update Categorie Berhasil"
            });
        }else{
            res.send({
                message:"update Categorie gagal"
            })
        }
    }).catch(err=>{
        res.status(500).send({
            message : err.message || "ada error"
        });

})
}

//HAPUS PRODUCT
exports.deleteCategorie = (req,res)=>{
    const id = req.params.id
    Categorie.destroy({
        where:{id:id}
    }).then(num=>{
        if(num == 1){
            res.send({
                message: "Categorie Berhasil"
            });
        }else{
            res.send({
                message:"Categorie tidak bisa dihapus"
            })
        }
    }).catch(err=>{
        res.status(500).send({
            message : err.message || "gagal menghapus. server error"
        });

    })
}

