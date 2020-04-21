const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const { events } = require("./hardCodedData")
const relativeBuildPath = './../build'
app.use(express.static(path.join(__dirname, relativeBuildPath)));
app.get('/getEvents', (req, res) => res.send({ events }));
app.get('/ping', (req, res) => res.send({reponseObject: 'pong'}));
app.get('/', (req, res) =>  res.sendFile(path.join(__dirname, relativeBuildPath, 'index.html')));
app.listen(process.env.PORT || 8080);