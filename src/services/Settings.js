class UISettings {
    // true means no security, will stop page from redirecting to main on change...
    // NOTE: when presenting MAKE this FALSE!
    get isLoggedInDefault() {
        return true
    }

    // make this true to default to adminsAccount
    // use this along with isLoggedInDefault set to true
    get useAdminAccount() {
        return true
    }

    get defaultUser() {
        return {
            userid:     this.isLoggedInDefault ? (this.useAdminAccount ? 'LankeyBoard' : 'jondoe123') : '',
            password:   this.isLoggedInDefault ? (this.useAdminAccount ? 'password'  : 'password')  : ''
        }
    }
}

export const Settings = new UISettings()