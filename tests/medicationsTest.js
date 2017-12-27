module.exports = {
    'Patient Headings Medications': function (browser) {
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

        var createMedicationForm = patientSummaryPage.section.createMedicationForm;

        var name = 'Salbutamol 100micrograms/dose breath actuated inhaler CFC free';
        var dose = '2 puffs';
        var timing = 'as required for wheeze';
        var directions = 'Contact GP if using more than 4 times per day';
        createMedicationForm.waitForElementPresent('@nameInput', browser.globals.wait_milliseconds)
        .setValue('@nameInput', name)
            .setValue('@doseInput', dose)
            .setValue('@doseTimingInput', timing)
            .setValue('@doseDirectionsInput', directions)
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

        var newName = 'Salbutamol';
        var newDose = '100micrograms';
        var newDirections = 'Contact GP if using more than 3 times per day';

        createMedicationForm.waitForElementVisible('@title', browser.globals.wait_milliseconds)
            .waitForElementVisible('@nameLabel', browser.globals.wait_milliseconds)
            .assert.containsText('@nameLabel', name)
            .assert.containsText('@doseLabel', dose)
            .assert.containsText('@timingLabel', timing)
            .assert.containsText('@directionsLabel', directions)
            .click('@editButton')
            .waitForElementPresent('@nameInput', browser.globals.wait_milliseconds)
            .clearValue('@nameInput')
            .setValue('@nameInput', newName)
            .clearValue('@doseInput')
            .setValue('@doseInput', newDose)
            .clearValue('@doseDirectionsInput')
            .setValue('@doseDirectionsInput', newDirections)
            .click('@completeButton')
            .waitForElementNotPresent('@nameInput', browser.globals.wait_milliseconds)
            .waitForElementVisible('@nameLabel', browser.globals.wait_milliseconds)
            .assert.containsText('@nameLabel', newName)
            .assert.containsText('@doseLabel', newDose)
            .assert.containsText('@timingLabel', timing)
            .assert.containsText('@directionsLabel', newDirections);

        patientSummaryPage.section.secondaryPanel2.assert.hidden('@body');
        patientSummaryPage.section.secondaryPanel3.assert.hidden('@body');
        patientSummaryPage.section.secondaryPanel4.assert.hidden('@body');

        browser.globals.deleteCurrentItem(browser, "medications");

        browser.end();
    }
};