const mongoose = require('mongoose');
const URI='mongodb+srv://fakher:user@cluster0.sknkf.mongodb.net/test?retryWrites=true&w=majority';
mongoose
const portfolioSchema = mongoose.Schema({
    nom:{type: String, required : true},
    prenom:{type: String, required : true},
    email:{type: String, required : true},
    numtel:{type: Number, required : true},
service: {type: String, required : false},
datee:{type: Date, required : false},
dates:{type: Date, required : true},
prov:{type: String, required : false},
nums:{type: Number, required : true},
nomme:{type: String, required : false},
desti:{type: String, required : false},
comm:{type: String, required : true}
})

module.exports=mongoose.model('portfolio',portfolioSchema);