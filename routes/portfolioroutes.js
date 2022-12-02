var express = require("express");
var router2 = express.Router();
const Portfolio = require('../models/portfolio');
const connexionroutes = require('./connexionroutes');

const joi = require('@hapi/joi');
const schema2 =joi.object({
nom: joi.string().min(4).max(25).alphanum().required(),
prenom: joi.string().min(4).max(25).alphanum().required(),
email: joi.string().min(15).max(30).required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
numtel :joi.string().min(8).max(8).required(),
service: joi.string().min(7).max(12).required(),
datee: joi.date().required(),
dates: joi.date().required(),
prov: joi.string().min(7).max(12).required(),
nums: joi.number().min(1).max(255).required(),
nomme: joi.string().min(8).max(20).alphanum().required(),
desti: joi.string().min(4).max(25).alphanum().required(),
comm: joi.string().min(25).max(255).required()
});
router2.post('/create/portfolio',async (req, res, next)=>{
 
    let body=req.body;
    const result=await schema2.validateAsync(body);
    res.json({result})
    console.log(result)    
    Portfolio.create(body)
    .then(result=>{
        console.log(res)
        res.json({message:"done",added:result})
    })
    .catch(err=>{
        console.log(err)
    })
});
router2.get('/read/portfolio',(req, res, next)=>{
    Portfolio.find({},(err,portfolios)=>{
        if (err)
        res.status(500).json({errmsg: err});
        res.status(200).json({msg: portfolios});
    });
  
    });
    router2.put('/update/portfolio/:_id',(req, res)=>{
        console.log('id:',req.params._id);
        console.log('données: ',req.body);
       Portfolio.findByIdAndUpdate({_id:req.params._id},{$set:req.body}).then(result =>{
           res.send(result);
           console.log('portfolio updated');
       })
       .catch(err=>{
           console.log(err);
           res.status(500).json({msg:err});
       })
         });

         router2.delete('/delete/portfolio/:id',(req, res, next)=>{
            Portfolio.findOneAndRemove({_id:req.params.id},(err,portfolio)=>{
                if(err)
                res.status(500).json({errmsg: err});
                res.status(200).json({msg: portfolio});
            });
            });

            module.exports= router2;

