class UISettings {

    // true means no security, will stop page from redirecting to main on change...
    // NOTE: when presenting MAKE this FALSE!
    get isLoggedInDefault() {
        return true
    }

    get defaultUser() {
        return {
            userid: 'unclefifi',
            password: 'password'
        }
    }

}

export const Settings = new UISettings()