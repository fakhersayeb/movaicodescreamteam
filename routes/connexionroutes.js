var express = require("express");
const jwt = require('jsonwebtoken');
var router5 = express.Router();
const Connexion = require('../models/connexion');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'fakhersayeb00@gmail.com',
      pass: 'fakher?Z123'
    }
  });
router5.post('/sendmail',(req, res)=>{
    let message=req.body.msg;
    let to=req.body.to;
    var mailOptions = {
        from: 'fakhersayeb00@gmail.com',
        to: to,
        subject: ' un rappel pour chaque rendez vous ou pour la date des médicaments pour chaque patient',
        text: message
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).json(info.response)
        }
      });
})
// package @hapi/joi pour validation des informations 
const joi = require('@hapi/joi');
// package bcryptjs pour le hahsage(cryptage) de mot de passes  
const bcrypt = require('bcryptjs');
const { any } = require("@hapi/joi");
const schema5 =joi.object({
Email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).min(15).max(30).required(),
Motdepasse : joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
});
router5.post('/inscri', async(req,res)=>{

    let body=req.body;
    const result=await schema5.validateAsync(body);
    console.log(result)
    const salt=await bcrypt.genSalt(10);
    const hashpassword= await bcrypt.hash(req.body.Motdepasse,salt);
    req.body.Motdepasse=hashpassword;
    let connexion = new Connexion(body)
    connexion.save((err, registeredUser) => {
      if (err) {
        console.log(err)      
      } else {
        let payload = {subject: registeredUser._id}
      let token = jwt.sign(payload, 'secretKey')
      res.status(200).send({token})
      }
    })
    });
    
    router5.post('/auth',async(req,res)=>{
      let body=req.body;
      Connexion.findOne({Email:body.Email},(error,connexion)=>{
        if(error) return res.status(500).send('serveur error')
        if(!connexion) return res.status(402).send('invalid email')
     if (bcrypt.compareSync(body.Motdepasse,connexion.Motdepasse)) 
     { let payload = {subject: connexion._id}
     let token = jwt.sign(payload, 'secretKey')
     res.status(200).send({token})}
 else   res.status(401).send('invalid mot de passe')

   })  
      })

    router5.get('/read/connexion',(req, res, next)=>{
        Connexion.find({},(err,connexions)=>{
            if (err)
            res.status(500).json({errmsg: err});
            res.status(200).json({msg: connexions});
        });
      
        });
        router5.put('/update/connexion',(req, res, next)=>{
           Connexion.findById(req.body._id,(err,connexion)=>{
            if (err)
            res.status(500).json({errmsg: err});
            Connexion.Email=req.body.email;
            Connexion.Motdepasse=hashpassword;
            Connexion.save((err,connexion)=>{
    if (err)
    res.status(500).json({errmsg: err});
            res.status(200).json({msg: connexion});
            });
           });
            });
            router5.delete('/delete/connexion/:id',(req, res, next)=>{
                Connexion.findOneAndRemove({_id:req.params.id},(err,connexion)=>{
                    if(err)
                    res.status(500).json({errmsg: err});
                    res.status(200).json({msg: connexion});
                });
                });
    
                module.exports= router5;