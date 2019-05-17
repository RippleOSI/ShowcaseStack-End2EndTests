const scrollPage = require('../utils/scrollPage.js');
const isCreationPossible = require('../utils/isCreationPossible.js');
const isEditingPossible = require('../utils/isEditingPossible.js');

const isTestChecked = require('../utils/isTestChecked.js');
const isTestForCurrentBase = require('../utils/isTestForCurrentBase');

module.exports = {
    'Patient Headings Medications': function (browser) {

        if (isTestChecked(browser, "medicationsTest") && isTestForCurrentBase(browser, "ReactJS")) {

            browser.page.loginPage().login();

            var patientSummaryPage = browser.page.patientSummaryPage();

            patientSummaryPage.handlePopUp();

            const tab = "medications";
            const nameFirstPart = 'ventolin';

            // browser.globals.deleteTestItems(browser, tab, "name", nameFirstPart);

            browser.pause(browser.globals.wait_milliseconds_shortest);
            leftBarMenu = patientSummaryPage.section.leftBarMenu;

            leftBarMenu.waitForElementVisible('@medications', browser.globals.wait_milliseconds_short)
                .click('@medications');

            medication = patientSummaryPage.section.medication;

            if (isCreationPossible(browser, 'medications')) {
                browser.pause(browser.globals.wait_milliseconds_short);
                medication.waitForElementVisible('@createButton', browser.globals.wait_milliseconds_short)
                    .getLocationInView('@createButton', scrollPage(browser))
                    .click('@createButton');

                var createMedicationForm = patientSummaryPage.section.createMedicationForm;

                var name = nameFirstPart;
                var dose = '2_puffs';
                var timing = 'required_for_wheeze';
                var directions = 'contact_gp_4';
                createMedicationForm.waitForElementPresent('@nameInput', browser.globals.wait_milliseconds_short)
                    .setValue('@nameInput', name)
                    .setValue('@doseInput', dose)
                    .setValue('@doseTimingInput', timing)
                    .setValue('@doseDirectionsInput', directions)
                    .getLocationInView('@routeSelect', scrollPage(browser))
                    .click('@routeSelect')
                    .waitForElementVisible('option', browser.globals.wait_milliseconds_shortest)
                    .click('option[value="Po Per Oral"]')
                    .getLocationInView('@completeButton', scrollPage(browser))
                    .click('@completeButton')
                    .waitForElementNotPresent('@completeButton', browser.globals.wait_milliseconds_short);

                browser.pause(browser.globals.wait_milliseconds_short);
                browser.refresh();
                browser.pause(browser.globals.wait_milliseconds_shortest);

                medication.waitForElementVisible('@filterButton', browser.globals.wait_milliseconds_shortest)
                    .getLocationInView('@filterButton', scrollPage(browser))
                    .click('@filterButton')
                    .waitForElementVisible('@filterInput', browser.globals.wait_milliseconds_short)
                    .setValue('@filterInput', name)
                    .section.table
                    .waitForElementVisible('td[data-th="Name"]', browser.globals.wait_milliseconds_short)
                    .getLocationInView('td[data-th="Name"]', scrollPage(browser))
                    .click('td[data-th="Name"]');

                var newName = 'ventolin_100micrograms';
                var newDose = '100micrograms';
                var newDirections = 'contact_gp';

                if (isEditingPossible(browser, 'medications')) {
                    createMedicationForm.waitForElementVisible('@title', browser.globals.wait_milliseconds_short)
                        .waitForElementVisible('@nameLabel', browser.globals.wait_milliseconds_short)
                        .assert.containsText('@nameLabel', name)
                        .assert.containsText('@doseLabel', dose)
                        .assert.containsText('@timingLabel', timing)
                        .assert.containsText('@directionsLabel', directions)
                        .getLocationInView('@editButton', scrollPage(browser))
                        .click('@editButton')
                        .waitForElementPresent('@nameInput', browser.globals.wait_milliseconds_short)
                        .clearValue('@nameInput')
                        .setValue('@nameInput', newName)
                        .clearValue('@doseInput')
                        .setValue('@doseInput', newDose)
                        .clearValue('@doseDirectionsInput')
                        .setValue('@doseDirectionsInput', newDirections)
                        .getLocationInView('@completeButton', scrollPage(browser))
                        .click('@completeButton');
                    browser.pause(browser.globals.wait_milliseconds);

                    createMedicationForm.waitForElementNotPresent('@nameInput', browser.globals.wait_milliseconds_short)
                        .waitForElementVisible('@nameLabel', browser.globals.wait_milliseconds_short)
                        .assert.containsText('@nameLabel', newName)
                        .assert.containsText('@doseLabel', newDose)
                        .assert.containsText('@timingLabel', timing)
                        .assert.containsText('@directionsLabel', newDirections);

                    patientSummaryPage.section.secondaryPanel2.assert.hidden('@body');
                    patientSummaryPage.section.secondaryPanel3.assert.hidden('@body');
                    patientSummaryPage.section.secondaryPanel4.assert.hidden('@body');

                    browser.globals.deleteCurrentItem(browser, tab);
                }
            }
        }
        browser.end();
    }
};