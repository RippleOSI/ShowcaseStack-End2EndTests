module.exports = {
    'Patient Headings Medications': function (browser) {
        browser.page.loginPage()
            .login();

        function scrollPage(result) {
          const coords = result.value || { x: 0, y: 0 };
          coords.x = coords.x || 0;
          coords.y = coords.y || 0;

          console.log("x " + coords.x + " y " + coords.y);

          browser.pause(browser.globals.wait_milliseconds_for_scrolling_before);
          browser.execute('window.scrollTo(' + coords.x + ', ' + coords.y + ')');
          console.log("scrolled!");
          browser.pause(browser.globals.wait_milliseconds_for_scrolling_after);
        }

        var patientSummaryPage = browser.page.patientSummaryPage();

        patientSummaryPage.handlePopUp();

        const tab = "medications";
        const nameFirstPart = 'Salbutamol';
        browser.globals.deleteTestItems(browser, tab, "name", nameFirstPart);

        browser.pause(browser.globals.wait_milliseconds_shortest);
        leftBarMenu = patientSummaryPage.section.leftBarMenu;

        leftBarMenu.waitForElementVisible('@medications', browser.globals.wait_milliseconds_short)
            .click('@medications');

        medication = patientSummaryPage.section.medication;
        browser.pause(browser.globals.wait_milliseconds_short);
        medication.waitForElementVisible('@createButton', browser.globals.wait_milliseconds_short)
            .getLocationInView('@createButton', function (result) { scrollPage(result); })
            .click('@createButton');

        var createMedicationForm = patientSummaryPage.section.createMedicationForm;

        var time = new Date().getTime();
        var name = nameFirstPart + " " + time;
        var dose = '2 puffs';
        var timing = 'as required for wheeze';
        var directions = 'Contact GP if using more than 4 times per day';
        createMedicationForm.waitForElementPresent('@nameInput', browser.globals.wait_milliseconds_short)
            .setValue('@nameInput', name)
            .setValue('@doseInput', dose)
            .setValue('@doseTimingInput', timing)
            .setValue('@doseDirectionsInput', directions)
            .getLocationInView('@routeSelect', function (result) { scrollPage(result); })
            .click('@routeSelect')
            .waitForElementVisible('option', browser.globals.wait_milliseconds_shortest)
            .click('option[value="Po Per Oral"]')
            .getLocationInView('@completeButton', function (result) { scrollPage(result); })
            .click('@completeButton')
            .waitForElementNotPresent('@completeButton', browser.globals.wait_milliseconds_short);

        browser.pause(browser.globals.wait_milliseconds_short);
        browser.refresh();
        browser.pause(browser.globals.wait_milliseconds_shortest);

        medication.waitForElementVisible('@filterButton', browser.globals.wait_milliseconds_shortest)
            .getLocationInView('@filterButton', function (result) { scrollPage(result); })
            .click('@filterButton')
            .waitForElementVisible('@filterInput', browser.globals.wait_milliseconds_short)
            .setValue('@filterInput', time)
            .section.table
            .waitForElementVisible('td[data-th="Name"]', browser.globals.wait_milliseconds_short)
            .getLocationInView('td[data-th="Name"]', function (result) { scrollPage(result); })
            .click('td[data-th="Name"]');

        var newName = 'Salbutamol 100micrograms ' + time;
        var newDose = '100micrograms';
        var newDirections = 'Contact GP if using more than 3 times per day';

        createMedicationForm.waitForElementVisible('@title', browser.globals.wait_milliseconds_short)
            .waitForElementVisible('@nameLabel', browser.globals.wait_milliseconds_short)
            .assert.containsText('@nameLabel', name)
            .assert.containsText('@doseLabel', dose)
            .assert.containsText('@timingLabel', timing)
            .assert.containsText('@directionsLabel', directions)
            .getLocationInView('@editButton', function (result) { scrollPage(result); })
            .click('@editButton')
            .waitForElementPresent('@nameInput', browser.globals.wait_milliseconds_short)
            .clearValue('@nameInput')
            .setValue('@nameInput', newName)
            .clearValue('@doseInput')
            .setValue('@doseInput', newDose)
            .clearValue('@doseDirectionsInput')
            .setValue('@doseDirectionsInput', newDirections)
            .getLocationInView('@completeButton', function (result) { scrollPage(result); })
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

        browser.end();
    }
};