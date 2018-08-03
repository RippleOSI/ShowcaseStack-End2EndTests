function isTestChecked(browser, testName) {
    var testsNotCheckedArray = browser.globals.settings.testsNotChecked;
    return testsNotCheckedArray.indexOf(testName) !== -1;
}

module.exports = isTestChecked;