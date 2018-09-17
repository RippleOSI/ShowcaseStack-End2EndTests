function isCreationPossible(browser, pluginName) {
    var creationDeniedArray = browser.globals.settings.creationDenied;
    return creationDeniedArray.indexOf(pluginName) === -1;
}

module.exports = isCreationPossible;
