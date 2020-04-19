const express = require('express');
const path = require('path');
const { events } = require("./hardCodedData")
const relativeBuildPath = './../build'
const mongoConnectionManager = require('./dbConn')
const userController = require('./routes/user')

module.exports = class ApplicationServer{
    constructor(){
        this.app = express()
        this._serveBuild()
    }

    _serveBuild(){
        this.app.use(express.static(path.join(__dirname, relativeBuildPath)));
        this.app.listen(process.env.PORT || 1234, () => {
            console.log('App server is starting...')
            this._addMiddlewares()
            this._serveRoutes()
            this._bindRoutes()
            this._connectToDb()
        })
    }

    _addMiddlewares() {
        // will allow us to read from body
        this.app.use(express.json({ extended: false }))
    }

    _connectToDb()
    {
        mongoConnectionManager.connect()
    }

    _bindRoutes() {
        this.app.use('/api/users', userController)
    }

    _serveRoutes() {
        this.app.get('/getEvents', (req, res) => res.send({ events }));
        this.app.get('/ping', (req, res) => res.send({reponseObject: 'pong'}));
        this.app.get('/', (req, res) =>  res.sendFile(path.join(__dirname, relativeBuildPath, 'index.html')));        
    }
}