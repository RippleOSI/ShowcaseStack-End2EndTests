const patientSummaryReactAdminPage = require('../page_objects/patientSummaryReactAdminPage');

const isTestChecked = require('../utils/isTestChecked.js');
const isTestForCurrentBase = require('../utils/isTestForCurrentBase');

module.exports = {
    'Helm React-Admin Test': function (browser) {

        if (isTestChecked(browser, "helmReactAdminSummaryTest") || isTestForCurrentBase(browser, "React-Admin")) {

            browser.page.loginPage().login();

            browser.pause(browser.globals.wait_milliseconds_shortest);

            var patientSummaryPage = browser.page.patientSummaryReactAdminPage();

            var patientBanner = patientSummaryPage.section.patientBanner;
            var patientBannerInfo = browser.globals.settings.patientBannerInfo;

            patientBanner.waitForElementVisible('@name', browser.globals.wait_milliseconds)
                .assert.containsText('@name', patientBannerInfo.name)
                .assert.containsText('@doctor', patientBannerInfo.doctor)
                .assert.containsText('@address', patientBannerInfo.address)
                .assert.containsText('@phone', patientBannerInfo.phone)
                .assert.containsText('@gender', patientBannerInfo.gender)
                .assert.containsText('@nhsNumber', patientBannerInfo.number);

            var patientSummary = patientSummaryPage.section.patientSummary;
            patientSummary.waitForElementVisible('@topThreeThingsPanel', browser.globals.wait_milliseconds);

            var patientSummaryTop = patientSummaryPage.section.patientSummaryTop;
            patientSummaryTop
                .waitForElementVisible('@iconSettings', browser.globals.wait_milliseconds_short)
                .click('@iconSettings');

            browser.pause(5000);

            var settingsModal = patientSummaryPage.section.settingsModalWindow;
            settingsModal
                .waitForElementVisible('@closeIcon', browser.globals.wait_milliseconds_short)
                .click('@closeIcon');

            browser.pause(5000);

            var topbarTopPart = patientSummaryPage.section.topbarTopPart;
            topbarTopPart
                .waitForElementVisible('@logoutIcon', browser.globals.wait_milliseconds_short)
                .click('@logoutIcon');

            browser.pause(5000);

            var userPanel = patientSummaryPage.section.userPanel;
            userPanel
                .waitForElementVisible('@signOut', browser.globals.wait_milliseconds_short)
                .click('@signOut');

        }
        browser.end();
    }
};