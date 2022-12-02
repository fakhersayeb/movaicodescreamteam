const mongoose = require('mongoose');
const URI='mongodb+srv://fakher:user@cluster0.sknkf.mongodb.net/test?retryWrites=true&w=majority';
mongoose

const connexionSchema=mongoose.Schema({
 
    Email:{type : String, required : true},
  Motdepasse:{type : String,  required: true}
})


module.exports=mongoose.model('connexion',connexionSchema);