const mongoose = require('mongoose');
const URI='mongodb+srv://fakher:user@cluster0.sknkf.mongodb.net/test?retryWrites=true&w=majority';
mongoose
 
var rendezvousSchema=mongoose.Schema({
numrend:{type:Number, required : true},
nom:{type: String, required : true},
prenom:{type: String, required : true},
email:{type: String, required : true},
numtel:{type: Number, required : true},
daterend:{type: Date, required : true},
tempsrend:{type:String,Required: true}
})

module.exports=mongoose.model('rendezvous',rendezvousSchema);