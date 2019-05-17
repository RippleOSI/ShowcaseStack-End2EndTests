const isTestChecked = require('../utils/isTestChecked.js');
const isTestForCurrentBase = require('../utils/isTestForCurrentBase');

module.exports = {
    'Patient Summary Sidebar menu': function (browser) {

        if (isTestChecked(browser, "sideBarMenuTest") && isTestForCurrentBase(browser, "ReactJS")) {

            browser.page.loginPage().login();

            var patientSummaryPage = browser.page.patientSummaryPage();
            patientSummaryPage.handlePopUp();

            browser.pause(browser.globals.wait_milliseconds_shortest);
            leftBarMenu = patientSummaryPage.section.leftBarMenu;

            patientSummaryPage.waitForElementVisible('@leftBarMenuToggle', browser.globals.wait_milliseconds)
                .click('@leftBarMenuToggle');

            if (browser.globals.version_switch_path === undefined || browser.globals.version_switch_path.indexOf('ang') !== -1) {
                leftBarMenu.waitForElementNotVisible('@patientSummary', browser.globals.wait_milliseconds)
                    .assert.hidden('@problems')
                    .assert.hidden('@allergies')
                    .assert.hidden('@medications')
                    .assert.hidden('@contacts');
            } else {
                leftBarMenu.waitForElementNotPresent('@patientSummary', browser.globals.wait_milliseconds)
                    .assert.elementNotPresent('@problems')
                    .assert.elementNotPresent('@allergies')
                    .assert.elementNotPresent('@medications')
                    .assert.elementNotPresent('@contacts');
            }
        }
        browser.end();
    }
};