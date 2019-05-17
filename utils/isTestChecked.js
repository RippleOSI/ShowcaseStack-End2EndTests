function isTestChecked(browser, testName) {
    var testsNotCheckedArray = browser.globals.settings.testsToCheck;
    return testsNotCheckedArray.indexOf(testName) !== -1;
}

module.exports = isTestChecked;