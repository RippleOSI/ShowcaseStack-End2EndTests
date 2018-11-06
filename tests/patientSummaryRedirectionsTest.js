const isTestChecked = require('../utils/isTestChecked.js');

module.exports = {
    'Patient Summary Redirections': function (browser) {
        browser.page.loginPage()
            .login();

        browser.resizeWindow(1920, 1080);

        var patientSummaryPage = browser.page.patientSummaryPage();

        var problemsTitle = (browser.globals.settings.version === 'helm') ? 'Problems / Issues' : 'Problems / Diagnoses';
        var medicationsTitle = (browser.globals.settings.version === 'helm') ? 'Medications' : 'All Medications';

        patientSummaryPage.handlePopUp();
        browser.pause(browser.globals.wait_milliseconds_shortest);

        leftBarMenu = patientSummaryPage.section.leftBarMenu;

        patientSummarySection = patientSummaryPage.section.patientSummary;

        patientSummarySection.waitForElementVisible('@title', browser.globals.wait_milliseconds);

        contactsBoardSection = patientSummarySection.section.contactsBoard;
        allergiesBoardSection = patientSummarySection.section.allergiesBoard;
        medicationsBoardSection = patientSummarySection.section.medicationsBoard;

        allergiesSection = patientSummaryPage.section.allergies;
        contactsSection = patientSummaryPage.section.contacts;
        medicationsSection = patientSummaryPage.section.medications;

        problemsBoardSection = patientSummarySection.section.problemsBoard;
        problemsSection = patientSummaryPage.section.problems;
        if (browser.globals.settings.version === 'helm') {
            problemsBoardSection = patientSummarySection.section.diagnosisBoard;
            problemsSection = patientSummaryPage.section.diagnosis;
        }

        var patientSummaryMain = browser.globals.settings.patientSummaryMain;

        if (false === isTestChecked(browser, "contacts")) {
            contactsBoardSection.click('@redirectButton');
            contactsSection.waitForElementVisible('@title', browser.globals.wait_milliseconds)
                .assert.containsText('@title', 'Contacts');
        }

        leftBarMenu.click(patientSummaryMain);
        patientSummarySection.waitForElementVisible('@title', browser.globals.wait_milliseconds);

        allergiesBoardSection.click('@redirectButton');
        allergiesSection.waitForElementVisible('@title', browser.globals.wait_milliseconds)
                .assert.containsText('@title', 'Allergies');

        leftBarMenu.click(patientSummaryMain);
        patientSummarySection.waitForElementVisible('@title', browser.globals.wait_milliseconds);
        problemsBoardSection.click('@redirectButton');

        allergiesSection.waitForElementVisible('@title', browser.globals.wait_milliseconds)
            .assert.containsText('@title', problemsTitle);

        leftBarMenu.click(patientSummaryMain);
        patientSummarySection.waitForElementVisible('@title', browser.globals.wait_milliseconds);
        medicationsBoardSection.click('@redirectButton');

        allergiesSection.waitForElementVisible('@title', browser.globals.wait_milliseconds)
            .assert.containsText('@title', medicationsTitle);

        leftBarMenu.click(patientSummaryMain);
        patientSummarySection.waitForElementVisible('@title', browser.globals.wait_milliseconds);

        browser.end();
    }
};