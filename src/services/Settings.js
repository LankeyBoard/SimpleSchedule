class UISettings {

    // true means no security, will stop page from redirecting to main on change...
    // NOTE: when presenting MAKE this FALSE!
    get isLoggedInDefault() {
        return true
    }

}

export const Settings = new UISettings()