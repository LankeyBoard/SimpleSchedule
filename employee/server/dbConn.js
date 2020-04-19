const mongoose = require("mongoose")
const Logger = require("./funLogger")



class databaseConnectionManager {
    constructor() {
        this.accountDetails = {
            accountName:    "ServiceAccount",
            accountPw:      "ServiceAccount",
            databaseName:   "SimpleSchedule"
        }
    }
    // public method that will connect us to to the Mongo database instance....
    async connect () {

        Logger.makeSpace(3)
        Logger.warn('Attempting to connect to mongo database...')
        Logger.makeSpace()
        // log(chalk.black.bgWhiteBright.bold('attempting to connect to mongo database...'));
        try {
            await mongoose.connect(this.dbConn, {useNewUrlParser:true, useCreateIndex: true ,useUnifiedTopology: true, replset: {sslValidate: false} })
            Logger.confirmation('\t\twe are connected.', 1)
        } catch (connectionError) {
            console.dir(connectionError.message)
            Logger.error(`\t\t${connectionError.message}`)
            process.exit(1)// Exit process with fail
        }
    }
    get dbConn() {
        return `mongodb+srv://${this.accountDetails.accountName}:${this.accountDetails.accountPw}@westcluster-t9k6z.mongodb.net/${this.accountDetails.databaseName}?retryWrites=true&w=majority`
    }
}
// only serving the single instance not the bluePrint(class)
module.exports = new databaseConnectionManager()