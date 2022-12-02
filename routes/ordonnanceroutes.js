var express = require("express");
var router3 = express.Router();
const Ordonnance = require('../models/ordonnance');
const connexionroutes = require('./connexionroutes');
const joi = require('@hapi/joi');
const schema3 =joi.object({
    numord :joi.number().min(1).max(1000).required(),
    prepa: joi.string().min(4).max(25).alphanum().required(),
    telpat : joi.number().required(),
    texte : joi.string().min(20).max(255).required()
});
router3.post('/create/ordonnance',async (req, res, next)=>{

    let body=req.body;
    const result=await schema3.validateAsync(body);
    res.json({result})
    console.log(result)
    Ordonnance.create(body)
    .then(resu=>{
        console.log(res)
        res.json({message:"done",added:resu})
    })
    .catch(err=>{
        console.log(err)
    })
    
    
    });
    router3.get('/read/ordonnance',(req, res, next)=>{
        Ordonnance.find({},(err,ordonnaces)=>{
            if (err)
            res.status(500).json({errmsg: err});
            res.status(200).json({msg: ordonnaces});
        });
      
        });
        router3.put('/update/ordonnance/:_id',(req, res)=>{
            console.log('id:',req.params._id);
            console.log('données: ',req.body);
           Ordonnance.findByIdAndUpdate({_id:req.params._id},{$set:req.body}).then(result =>{
               res.send(result);
               console.log('ordonnance updated');
           })
           .catch(err=>{
               console.log(err);
               res.status(500).json({msg:err});
           })
            });
            router3.delete('/delete/ordonnance/:id',(req, res, next)=>{
                Ordonnance.findOneAndRemove({_id:req.params.id},(err,ordonnace)=>{
                    if(err)
                    res.status(500).json({errmsg: err});
                    res.status(200).json({msg: ordonnace});
                });
                });
    
                module.exports= router3;