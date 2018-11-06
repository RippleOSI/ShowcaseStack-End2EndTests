const isTestChecked = require('../utils/isTestChecked.js');

module.exports = {
    'Patient Summary': function (browser) {
        browser.page.loginPage()
            .login();

        browser.resizeWindow(1920, 1080);

        var patientSummaryPage = browser.page.patientSummaryPage();

        patientSummaryPage.handlePopUp();

        patientSummarySection = patientSummaryPage.section.patientSummary;

        patientSummarySection.waitForElementVisible('@title', browser.globals.wait_milliseconds);

        browser.pause(browser.globals.wait_milliseconds_short);

        if (browser.globals.settings.version !== 'helm') {
            contactsSection = patientSummarySection.section.contactsBoard;
            contactsSection.assert.visible('@header');
        }

        allergiesSection = patientSummarySection.section.allergiesBoard;
        allergiesSection.assert.visible('@header');

        medicationsSection = patientSummarySection.section.medicationsBoard;
        medicationsSection.assert.visible('@header');

        problemsSection = (browser.globals.settings.version === 'helm') ? patientSummarySection.section.diagnosisBoard : patientSummarySection.section.problemsBoard;
        problemsSection.assert.visible('@header');

        patientSummarySection.click('@filterButton');

        filterMenuSection = patientSummarySection.section.filterMenu;

        browser.pause(browser.globals.wait_milliseconds_shortest);

        filterMenuSection.waitForElementVisible('@problemsCheckboxLabel', browser.globals.wait_milliseconds)
            .assert.visible('@medicationsCheckboxLabel')
            .click('@allergiesCheckboxLabel');

        allergiesSection.waitForElementNotPresent('@header', browser.globals.wait_milliseconds);

        filterMenuSection.click('@medicationsCheckboxLabel');

        medicationsSection.waitForElementNotPresent('@header', browser.globals.wait_milliseconds);

        filterMenuSection.click('@problemsCheckboxLabel');

        problemsSection.waitForElementNotPresent('@header', browser.globals.wait_milliseconds);

        browser.end();
    }
};