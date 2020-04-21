class Settings 
{
    constructor() {}

    get secret() {
        return "SECRET"
    }

    get tokenExpiry() {
        return "10h"
    }

    get accountDetails() {
        return {
            accountName:    "ServiceAccount",
            accountPw:      "ServiceAccount",
            databaseName:   "SimpleSchedule"
        }
    }
}

module.exports = new Settings()