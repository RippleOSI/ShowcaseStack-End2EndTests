const patientSummaryReactAdminPage = require('../page_objects/patientSummaryReactAdminPage');

const isTestChecked = require('../utils/isTestChecked.js');
const isTestForCurrentBase = require('../utils/isTestForCurrentBase');

module.exports = {
    'Helm React-Admin Test': function (browser) {

        if (isTestChecked(browser, "helmReactAdminTopThreeThingsTest") || isTestForCurrentBase(browser, "React-Admin")) {

            browser.page.loginPage().login();

            browser.pause(browser.globals.wait_milliseconds_shortest);

            var patientSummaryPage = browser.page.patientSummaryReactAdminPage();

            // Redirect to TopThreeThingsList
            var sidebarMenu = patientSummaryPage.section.sidebarMenu;
            sidebarMenu
                .waitForElementVisible('@topThreeThingsItem', browser.globals.wait_milliseconds)
                .click('@topThreeThingsItem');

            browser.pause(5000);

            // Check presence of table heading and TopThreeThings list
            var topThreeThingsPage = browser.page.topThreeThingsReactAdminPage();

            var tableHeader = topThreeThingsPage.section.tableHeader;
            tableHeader
                .waitForElementVisible('@title', browser.globals.wait_milliseconds)
                .assert.containsText('@title', 'Top Three Things');

            var listTemplate = topThreeThingsPage.section.listTemplate;
            listTemplate
                .waitForElementVisible('@listTop3Things', browser.globals.wait_milliseconds)
                .waitForElementVisible('@tableRow', browser.globals.wait_milliseconds)
                .click('@tableRow');

            browser.pause(5000);

            // Check presence of Edit block
            listTemplate
                .waitForElementVisible('@editButton', browser.globals.wait_milliseconds)
                .click('@editButton');

            browser.pause(5000);

            // Edit
            var topThreeThingsForm = topThreeThingsPage.section.topThreeThingsForm;
            topThreeThingsForm
                .waitForElementVisible('@name1', browser.globals.wait_milliseconds)
                .clearValue('@name1').setValue('@name1', 'test name 1')
                .clearValue('@description1').setValue('@description1', 'test description 1')
                .clearValue('@name2').setValue('@name2', 'test name 2')
                .clearValue('@description2').setValue('@description2', 'test description 2')
                .clearValue('@name3').setValue('@name3', 'test name 3')
                .clearValue('@description3').setValue('@description3', 'test description 3')
                .click('@saveButton');

            browser.pause(5000);

            // Redirect to Pstient Summary page
            sidebarMenu
                .waitForElementVisible('@summaryItem', browser.globals.wait_milliseconds)
                .click('@summaryItem');

            browser.pause(5000);

            // Open User Panel
            var topbarTopPart = patientSummaryPage.section.topbarTopPart;
            topbarTopPart
                .waitForElementVisible('@logoutIcon', browser.globals.wait_milliseconds_short)
                .click('@logoutIcon');

            browser.pause(5000);

            // Sign Out
            var userPanel = patientSummaryPage.section.userPanel;
            userPanel
                .waitForElementVisible('@signOut', browser.globals.wait_milliseconds_short)
                .click('@signOut');

        }
        browser.end();
    }
};