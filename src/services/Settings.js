class UISettings {
    // true means no security, will stop page from redirecting to main on change...
    // NOTE: when presenting MAKE this FALSE!
    get isLoggedInDefault() {
        return true
    }

    // make this true to default to adminsAccount
    // use this along with isLoggedInDefault set to true
    get useAdminAccount() {
        return false
    }

    get defaultUser() {
        return {
            userid:     this.isLoggedInDefault ? (this.useAdminAccount ? 'LankeyBoard' : 'jondoe123') : '',
            password:   this.isLoggedInDefault ? (this.useAdminAccount ? 'password'  : 'password')  : ''
        }
    }

    get defaultImageUrl() {
        return "//www.gravatar.com/avatar/069890ab020a74543fda220305f4f653?s=400&r=pg&d=mm"
    }
}

export const Settings = new UISettings()