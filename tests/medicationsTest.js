module.exports = {
    'Patient Headings > Medications': function (browser) {
        browser.page.loginPage()
            .login();

        var patientSummaryPage = browser.page.patientSummaryPage();

        patientSummaryPage.handlePopUp();

        leftBarMenu = patientSummaryPage.section.leftBarMenu;

        leftBarMenu.waitForElementVisible('@medications', browser.globals.wait_milliseconds)
            .click('@medications');

        medication = patientSummaryPage.section.medication;
        browser.pause(browser.globals.wait_milliseconds);
        medication.waitForElementVisible('@createButton', browser.globals.wait_milliseconds)
            .click('@createButton');

        createMedicationForm = patientSummaryPage.section.createMedicationForm;

        createMedicationForm.waitForElementPresent('@nameInput', browser.globals.wait_milliseconds)
        .setValue('@nameInput', 'Salbutamol 100micrograms/dose breath actuated inhaler CFC free')
            .setValue('@doseInput', '2 puffs')
            .setValue('@doseTimingInput', 'as required for wheeze')
            .setValue('@doseDirectionsInput', 'Contact GP if using more than 4 times per day')
            .click('@routeSelect')
            .waitForElementVisible('option', browser.globals.wait_milliseconds)
            .click('option[value="Po Per Oral"]')
            .click('@completeButton')
            .waitForElementNotPresent('@completeButton', browser.globals.wait_milliseconds);

        medication.click('@filterButton')
            .waitForElementVisible('@filterInput', browser.globals.wait_milliseconds)
            .setValue('@filterInput', 'Salbu')
            .section.table
            .waitForElementVisible('td[data-th="Name"]', browser.globals.wait_milliseconds)
            .click('td[data-th="Name"]');

        createMedicationForm.waitForElementVisible('@title', browser.globals.wait_milliseconds)
            .click('@editButton')
            .waitForElementPresent('@nameInput', browser.globals.wait_milliseconds)
            .clearValue('@nameInput')
            .setValue('@nameInput', 'Salbutamol')
            .clearValue('@doseInput')
            .setValue('@doseInput', '100micrograms')
            .clearValue('@doseDirectionsInput')
            .setValue('@doseDirectionsInput', 'Contact GP if using more than 3 times per day')
            .click('@completeButton')
            .waitForElementNotPresent('@nameInput', browser.globals.wait_milliseconds);

        patientSummaryPage.section.secondaryPanel2.assert.hidden('@body');
        patientSummaryPage.section.secondaryPanel3.assert.hidden('@body');
        patientSummaryPage.section.secondaryPanel4.assert.hidden('@body');

        browser.globals.deleteCurrentItem(browser, "medications");

        browser.end();
    }
};