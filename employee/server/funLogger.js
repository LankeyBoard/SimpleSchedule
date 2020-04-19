const chalk = require('chalk')
const log = console.log

const confirmationStyle = chalk.white.bgGreen.bold
const errorStyle = chalk.yellowBright.bgRed
const basicAlertStyle = chalk.red.bgWhiteBright.bold

class AppLogger
{
    constructor() 
    {

    }

    static warn(msg) {
        log(basicAlertStyle(msg))
    }

    static confirmation(msg) {
        log(confirmationStyle(msg))
    }

    static error(msg) {
        errorStyle(msg)
    }

    static makeSpace(spaceCount) {
        if(!spaceCount) {
            log("\n")
        } else {
            let spaced = ""
            for(let i = 0; i < spaceCount; i++)
                spaced += "\n"
            log(spaced)
        }
    }
}

module.exports = AppLogger
