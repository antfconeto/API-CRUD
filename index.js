const express = require("express")
const app = express()
const mongoose = require("mongoose")
const router = require("./router/router")
const bodyparser = require("body-parser")
app.use(bodyparser.urlencoded({
    extended:true
}
))
app.use(bodyparser.json())
 
//rotas
 app.use(router)
//bd
mongoose.connect("mongodb://localhost/bancoapi").then(()=>{
    console.log("conectado ao bd")
}).catch(()=>{

})





app.listen(3000, ()=>{
    console.log("server runing")
})