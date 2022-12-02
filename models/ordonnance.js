const mongoose = require('mongoose');
const URI='mongodb+srv://fakher:user@cluster0.sknkf.mongodb.net/test?retryWrites=true&w=majority';
mongoose
var ordonnanceSchema = mongoose.Schema({
 numord:{type:Number, required: true},   
 prepa:{type:String,required: true},
 telpat:{type:Number,required: true},
texte:{type: String , required: true}

})


module.exports=mongoose.model('ordonnance',ordonnanceSchema);