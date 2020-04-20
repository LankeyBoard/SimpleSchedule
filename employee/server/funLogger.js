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

    static Warning(msg) {
        const padding = 2
        // const msg = "App server is starting..."
        const msgLen = msg.length + (padding*2)
        let stars = ''
        let _createSpace=''
        for(let k=0;k<padding;k++) {
            _createSpace+=' '
        }
        for(let i=0;i< msgLen;i++) {
            stars+='*'
        }
        this.makeSpace(2)
        this.warn('\t\t'+stars)
        this.warn('\t\t'+_createSpace+msg+_createSpace)
        this.warn('\t\t'+stars)
        this.makeSpace(2)
    }

    static Confirm(msg) {
        const padding = 2
        // const msg = "App server is starting..."
        const msgLen = msg.length + (padding*2)
        let stars = ''
        let _createSpace=''
        for(let k=0;k<padding;k++) {
            _createSpace+=' '
        }
        for(let i=0;i< msgLen;i++) {
            stars+='*'
        }
        this.makeSpace(2)
        this.confirmation('\t\t'+stars)
        this.confirmation('\t\t'+_createSpace+msg+_createSpace)
        this.confirmation('\t\t'+stars)
        this.makeSpace(2)
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
