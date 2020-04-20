const mongoose = require("mongoose")
const Logger = require("./funLogger")
const Settings = require('./settings')

class databaseConnectionManager {
    constructor() {}

    // public method that will connect us to to the Mongo database instance....
    async connect() {
        Logger.Warning('Attempting to connect to mongo database...')
        try {
            await mongoose.connect(this.dbConn, {useNewUrlParser:true, useCreateIndex: true ,useUnifiedTopology: true, replset: {sslValidate: false} })
            Logger.Confirm('Congrats MongoDb has been established.')
        } catch (connectionError) {
            console.dir(connectionError.message)
            Logger.error(`\t\t${connectionError.message}`)
            process.exit(1)// Exit process with fail
        }
    }
    get dbConn() {
        return `mongodb+srv://${Settings.accountDetails.accountName}:${Settings.accountDetails.accountPw}@westcluster-t9k6z.mongodb.net/${Settings.accountDetails.databaseName}?retryWrites=true&w=majority`
    }
}
// only serving the single instance not the bluePrint(class)
module.exports = new databaseConnectionManager()