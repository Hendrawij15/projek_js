const express = require('express')
const app = express()
const cors = require('cors')

var corsoption = {
    origin: "http://localhost:4000"
}

app.use(cors(corsoption))

app.use(express.json())

app.use(express.urlencoded({extended:true}))


app.get('/',(req,res)=>{ //memanggil di postman/web browser//
    res.json({
        message:'Selamat datang di Online Shop'
    })
})

//SINGKRONISASI DATABASE
const db = require("./app/models")
 db.sequelize.sync({force:false}).then(()=>{
    console.log ("Singkronisasi Berhasil..")
 }).catch((err)=>{
    console.log (`failed sync db ${err.message}`)
 })

require("./app/routes/online_shop.routes")(app);


const PORT = 4545
app.listen(PORT,()=>{
    console.log(`server up on port ${PORT}`)
})