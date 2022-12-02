const mongoose = require('mongoose');
const URI='mongodb+srv://fakher:user@cluster0.sknkf.mongodb.net/test?retryWrites=true&w=majority';
mongoose
 var patientSchema = mongoose.Schema({
nom:{type: String, required : true},
prenom:{type: String, required : true},
email:{type: String, required : true},
numtel:{type: Number, required : true}
 })

 module.exports=mongoose.model('patient',patientSchema);