function isTestForCurrentBase(browser, base) {
    return browser.globals.settings.base === base;
}

module.exports = isTestForCurrentBase;