module.exports = {
    'Patient Summary': function (browser) {
        browser.page.loginPage()
            .login();

        var patientSummaryPage = browser.page.patientSummaryPage();

        patientSummaryPage.handlePopUp();

        patientSummarySection = patientSummaryPage.section.patientSummary;

        patientSummarySection.waitForElementVisible('@title', browser.globals.wait_milliseconds);

        contactsSection = patientSummarySection.section.contactsBoard;
        problemsSection = patientSummarySection.section.problemsBoard;
        allergiesSection = patientSummarySection.section.allergiesBoard;
        medicationsSection = patientSummarySection.section.medicationsBoard;

        contactsSection.assert.visible('@header');
        problemsSection.assert.visible('@header');
        allergiesSection.assert.visible('@header');
        medicationsSection.assert.visible('@header');

        patientSummarySection.click('@filterButton');

        filterMenuSection = patientSummarySection.section.filterMenu;

        filterMenuSection.waitForElementVisible('@contactsCheckboxLabel', browser.globals.wait_milliseconds)
            .assert.visible('@problemsCheckboxLabel')
            .assert.visible('@allergiesCheckboxLabel')
            .assert.visible('@medicationsCheckboxLabel')
            .click('@contactsCheckboxLabel');

        contactsSection.waitForElementNotPresent('@header', browser.globals.wait_milliseconds);

        filterMenuSection.click('@allergiesCheckboxLabel');

        allergiesSection.waitForElementNotPresent('@header', browser.globals.wait_milliseconds);

        filterMenuSection.click('@contactsCheckboxLabel');

        contactsSection.waitForElementVisible('@header', browser.globals.wait_milliseconds);

        browser.end();
    }
};