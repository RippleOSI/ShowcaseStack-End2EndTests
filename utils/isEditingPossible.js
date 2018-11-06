function isEditingPossible(browser, pluginName) {
    var creationDeniedArray = browser.globals.settings.editingDenied;
    return creationDeniedArray.indexOf(pluginName) === -1;
}

module.exports = isEditingPossible;
