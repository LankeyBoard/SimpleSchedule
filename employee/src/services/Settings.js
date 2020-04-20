class UISettings {

    get isLocalHost() {
        return true
    }

    get isLoggedInDefault() {
        return this.isLocalHost
    }
}

export const Settings = new UISettings()