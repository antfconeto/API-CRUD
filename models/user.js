const mongoose = require("mongoose")

const User = mongoose.model('User',{
    nome:String,
    idade:Date,
    salario:Number
})
module.exports = User