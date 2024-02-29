const { where } = require('sequelize');
const db = require ('../models');
const Role = db.roles;


const Op = db.Sequelize.Op;

//Buat PRODUCT

exports.createRole = (req,res)=>{
    //validasi request
    if(!req.body.name){
        res.status(400).send({
            message: " kolom tidak boleh kosong"
        });
        return;
    }

    //create
    const role = {
        name:req.body.name,
    }

    //menyimpan database
    Role.create(role).then(data=>{
        res.send(data)
    }).catch(err=>{
        res.status(500).send({
            message:err.message || "ada error"
        })
    })
}

//GetALL
exports.findallRole = (req,res)=>{
    const name =req.query.name;
    var condition = name?{name: {[Op.like]:`%${name}%`}}:null; //berfungsi untuk searching

    Role.findAll({
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
exports.updateRole = (req,res)=>{
    const id = req.params.id
    Role.update(req.body,{
        where: {id:id}
    }).then(num=>{
        if(num == 1){
            res.send({
                message: "Update Role Berhasil"
            });
        }else{
            res.send({
                message:"update Role gagal"
            })
        }
    }).catch(err=>{
        res.status(500).send({
            message : err.message || "ada error"
        });

})
}

//HAPUS PRODUCT
exports.deleteRole = (req,res)=>{
    const id = req.params.id
    Role.destroy({
        where:{id:id}
    }).then(num=>{
        if(num == 1){
            res.send({
                message: "Hapus Role Berhasil"
            });
        }else{
            res.send({
                message:"Role tidak bisa dihapus"
            })
        }
    }).catch(err=>{
        res.status(500).send({
            message : err.message || "gagal menghapus. server error"
        });

    })
}

