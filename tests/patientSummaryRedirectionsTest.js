module.exports = {
    'Patient Summary Redirections': function (browser) {
        browser.page.loginPage()
            .login();

        var patientSummaryPage = browser.page.patientSummaryPage();

        patientSummaryPage.handlePopUp();
        browser.pause(browser.globals.wait_milliseconds_shortest);

        leftBarMenu = patientSummaryPage.section.leftBarMenu;

        patientSummarySection = patientSummaryPage.section.patientSummary;

        patientSummarySection.waitForElementVisible('@title', browser.globals.wait_milliseconds);

        contactsBoardSection = patientSummarySection.section.contactsBoard;
        problemsBoardSection = patientSummarySection.section.problemsBoard;
        allergiesBoardSection = patientSummarySection.section.allergiesBoard;
        medicationsBoardSection = patientSummarySection.section.medicationsBoard;

        allergiesSection = patientSummaryPage.section.allergies;
        contactsSection = patientSummaryPage.section.contacts;
        medicationsSection = patientSummaryPage.section.medications;
        problemsSection = patientSummaryPage.section.problems;

        contactsBoardSection.click('@redirectButton');

        contactsSection.waitForElementVisible('@title', browser.globals.wait_milliseconds)
            .assert.containsText('@title', 'Contacts');

        leftBarMenu.click('@patientSummary');
        patientSummarySection.waitForElementVisible('@title', browser.globals.wait_milliseconds);

        allergiesBoardSection.click('@redirectButton');

        allergiesSection.waitForElementVisible('@title', browser.globals.wait_milliseconds)
            .assert.containsText('@title', 'Allergies');

        leftBarMenu.click('@patientSummary');
        patientSummarySection.waitForElementVisible('@title', browser.globals.wait_milliseconds);

        problemsBoardSection.click('@redirectButton');

        allergiesSection.waitForElementVisible('@title', browser.globals.wait_milliseconds)
            .assert.containsText('@title', 'Problems / Diagnoses');

        leftBarMenu.click('@patientSummary');
        patientSummarySection.waitForElementVisible('@title', browser.globals.wait_milliseconds);

        medicationsBoardSection.click('@redirectButton');

        allergiesSection.waitForElementVisible('@title', browser.globals.wait_milliseconds)
            .assert.containsText('@title', 'All Medications');

        leftBarMenu.click('@patientSummary');
        patientSummarySection.waitForElementVisible('@title', browser.globals.wait_milliseconds);

        browser.end();
    }
};