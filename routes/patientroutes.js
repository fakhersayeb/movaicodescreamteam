var express = require("express");
var router = express.Router();
const Patient = require('../models/patient');
const connexionroutes = require('./connexionroutes');
const joi = require('@hapi/joi');
const schema =joi.object({
nom: joi.string().min(4).max(25).alphanum().required(),
prenom: joi.string().min(4).max(25).alphanum().required(),
email: joi.string().min(15).max(30).required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
numtel :joi.string().min(8).max(8).required()
});
router.post('/create',async (req, res, next)=>{
let body=req.body;
const result = await schema.validateAsync(body);
res.json({result});
console.log(result)
Patient.create(body)
.then(resu=>{
    console.log(res)
    res.json({message:"done",added:resu})
})
.catch(err=>{
    console.log(err)
})


});
router.get('/read',(req, res, next)=>{
    Patient.find({},(err,patients)=>{
        if (err)
        res.status(500).json({errmsg: err});
        res.status(200).json({msg: patients});
    });
  
    });
    router.put('/update/:_id',(req, res)=>{
        console.log('id:',req.params._id);
        console.log('données: ',req.body);
       Patient.findByIdAndUpdate({_id:req.params._id},{$set:req.body}).then(result =>{
           res.send(result);
           console.log('patient updated');
       })
       .catch(err=>{
           console.log(err);
           res.status(500).json({msg:err});
       })
       
        
        });
        router.delete('/delete/:id',(req, res, next)=>{
            Patient.findOneAndRemove({_id:req.params.id},(err,patient)=>{
                if(err)
                res.status(500).json({errmsg: err});
                res.status(200).json({msg: patient});
            });
            });

            module.exports= router;