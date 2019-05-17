const isTestChecked = require('../utils/isTestChecked.js');
const isTestForCurrentBase = require('../utils/isTestForCurrentBase');

module.exports = {
    'Patient Headings Top Three Things': function (browser) {

        if (isTestChecked(browser, "topThreeThingsTest") || isTestForCurrentBase(browser, "ReactJS")) {

            browser.page.loginPage().login();

            var patientSummaryPage = browser.page.patientSummaryPage();
            patientSummaryPage.handlePopUp();

            const tab = "topThreeThings";

            browser.pause(browser.globals.wait_milliseconds_shortest);
            var leftBarMenu = patientSummaryPage.section.leftBarMenu;

            leftBarMenu.waitForElementVisible('@topThreeThings', browser.globals.wait_milliseconds_short)
                .click('@topThreeThings');

            var topThreeThings = patientSummaryPage.section.topThreeThings;

            browser.pause(browser.globals.wait_milliseconds_short);

            topThreeThings
                .waitForElementVisible('@table', browser.globals.wait_milliseconds_short)
                .click('@tableRow');

            var topThreeThingsDetails = patientSummaryPage.section.topThreeThingsDetails;

            topThreeThingsDetails
                .waitForElementPresent('@title', browser.globals.wait_milliseconds_short)
                .click('@editButton');

            var topThreeThingsEdit = patientSummaryPage.section.topThreeThingsEdit;

            topThreeThingsEdit
                .clearValue('@name1').setValue('@name1', 'test name 1')
                .clearValue('@description1').setValue('@description1', 'test description 1')
                .clearValue('@name2').setValue('@name2', 'test name 2')
                .clearValue('@description2').setValue('@description2', 'test description 2')
                .clearValue('@name3').setValue('@name3', 'test name 3')
                .clearValue('@description3').setValue('@description3', 'test description 3')
                .click('@completeButton');

            browser.pause(browser.globals.wait_milliseconds_short);
        }
        browser.end();
    }
};