const { where } = require('sequelize');
const db = require ('../models');
const User = db.users;

const Op = db.Sequelize.Op;

//Buat User

exports.createUser = (req,res)=>{
    //validari request
    if(!req.body.name){
        res.status(400).send({
            message: " kolom tidak boleh kosong"
        });
        return;
    }

    //create
    const user = {
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        roleId: req.body.roleId
    }

    //menyimpan database
    User.create(user).then(data=>{
        res.send(data)
    }).catch(err=>{
        res.status(500).send({
            message:err.message || "ada error"
        })
    })
}

//GetALL
exports.findallUser = (req,res)=>{
    const name =req.query.name;
    var condition = name?{name: {[Op.like]:`%${name}%`}}:null; //berfungsi untuk searching

    User.findAll({
        whare:condition,
        include:[
            "roles",
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
exports.updateUser = (req,res)=>{
    const id = req.params.id
    User.update(req.body,{
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

//HAPUS USER
exports.deleteUser = (req,res)=>{
    const id = req.params.id
    User.destroy({
        where:{id:id}
    }).then(num=>{
        if(num == 1){
            res.send({
                message: "Hapus User Berhasil"
            });
        }else{
            res.send({
                message:"User tidak bisa dihapus"
            })
        }
    }).catch(err=>{
        res.status(500).send({
            message : err.message || "gagal menghapus. server error"
        });

    })
}

