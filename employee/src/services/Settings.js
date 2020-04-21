class UISettings {

    get isLocalHost() {
        return true
    }

    // true means no security...
    get isLoggedInDefault() {
        return false
    }

    get defaultRoute()
    {
        return this.isLocalHost ? "/" : "/"
    }
}

export const Settings = new UISettings()