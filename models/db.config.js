const mongoose=require('mongoose');
mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology: true },function(err){
    if (err) throw err
    console.log('db connected');
});
module.exports=mongoose;