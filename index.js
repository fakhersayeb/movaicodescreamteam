const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express(); 
dotenv.config();
var router = express.Router();
const port = process.env.PORT || 3000;
// importation des routes
const patientroutes = require('./routes/patientroutes');
const portfolioroutes = require('./routes/portfolioroutes');
const ordonnancesroutes = require('./routes/ordonnanceroutes');
const rendezvousroutes = require('./routes/rendezvousroutes');
const connexionroutes = require('./routes/connexionroutes');
const inscriptionroutes = require('./routes/inscriptionroutes');
const db = require('./models/inscription');
const connectDB = require('./models/db.config');
const connectdb = require('./models/portfolio');
const connectDb = require('./models/ordonnance');
const connectdB = require('./models/rendez_vous');
const connect_dB = require('./models/connexion');
// package body-parser pour lire les body des réquetes envoyés par le client(frontend)
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
// packaqge cors assure le travail avec des applications de domain/port different comme angular port 4200
app.use(cors());
// utilisation des routes
app.use('/',patientroutes);
app.use('/',portfolioroutes);
app.use('/',ordonnancesroutes);
app.use('/',rendezvousroutes);
app.use('/',connexionroutes);
app.use('/',inscriptionroutes);
app.use(function(req,res){
res.header('Access-Control-Allow-Origin',"*");
res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE');
res.header('Access-Control-Allow-Headers','Content-Type');

});
const server = http.createServer(app).listen(port);
console.log('Bienvenue , tu est connecté sur le port'+" "+port);

var io = require('socket.io').listen(server);

io.on('connection',(socket)=>{

    console.log('new connection made.');
    socket.on('join', function(data){
        //joining
        socket.join(data.room);
  
        console.log(data.user + 'joined the room : ' + data.room);
  
        socket.broadcast.to(data.room).emit('new user joined', {user:data.user, message:'a rejoint la salle.'});
      });
      socket.on('leave', function(data){
    
        console.log(data.user + 'left the room : ' + data.room);
  
        socket.broadcast.to(data.room).emit('left room', {user:data.user, message:'a quitté la salle.'});
  
        socket.leave(data.room);
      });
      socket.on('message',function(data){

        io.in(data.room).emit('new message', {user:data.user, message:data.message});
      })
});

