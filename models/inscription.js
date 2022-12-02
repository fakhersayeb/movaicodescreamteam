const mongoose = require('mongoose');
const URI='mongodb+srv://fakher:user@cluster0.sknkf.mongodb.net/test?retryWrites=true&w=majority';
mongoose

const inscriptionSchema=mongoose.Schema({
    nom:{type:String,required: true},
    prenom:{type:String,required: true},
    Email:{type : String, required : true},
  Motdepasse:{type : String,  required: true}
})


module.exports=mongoose.model('inscription',inscriptionSchema);