const scrollPage = require('../utils/scrollPage.js');
const isCreationPossible = require('../utils/isCreationPossible.js');
const isEditingPossible = require('../utils/isEditingPossible.js');

module.exports = {
    'Patient Headings Vaccinations': function (browser) {

        browser.page.loginPage()
            .login();

        browser.resizeWindow(1920, 1080);

        var patientSummaryPage = browser.page.patientSummaryPage();

        patientSummaryPage.handlePopUp();

        const tab = "vaccinations";
        const newNameFirstPart = 'antigen';
        const nameFirstPart = 'hepatitis_a';

        browser.globals.deleteTestItems(browser, tab, "vaccinationName", nameFirstPart);
        browser.globals.deleteTestItems(browser, tab, "vaccinationName", newNameFirstPart);

        browser.pause(browser.globals.wait_milliseconds_shortest);
        leftBarMenu = patientSummaryPage.section.leftBarMenu;

        leftBarMenu.waitForElementVisible('@vaccinations', browser.globals.wait_milliseconds_short)
            .click('@vaccinations');

        var vaccinations = patientSummaryPage.section.vaccinations;

        if (isCreationPossible(browser, 'vaccinations')) {
            browser.pause(browser.globals.wait_milliseconds_short);
            vaccinations.waitForElementVisible('@createButton', browser.globals.wait_milliseconds_short)
                .getLocationInView('@createButton', scrollPage(browser))
                .click('@createButton');

            var createVaccinationForm = patientSummaryPage.section.createVaccinationForm;

            const name = nameFirstPart;
            createVaccinationForm.waitForElementPresent('@nameInput', browser.globals.wait_milliseconds_short)
                .setValue('@nameInput', name)
                .getLocationInView('@calendar', scrollPage(browser))
                .click('@calendar');
            browser.pause(browser.globals.wait_milliseconds_shortest);

            const date = '20-Nov-2017';
            browser.globals.pickDate(browser, date);
            browser.pause(browser.globals.wait_milliseconds_shortest);

            const comment = 'immunisation_complete';
            const serial = "2";
            createVaccinationForm.setValue('@commentInput', comment)
                .setValue('@serialInput', serial);
            browser.execute("window.scrollTo(0,document.body.scrollHeight);"); //scroll down
            createVaccinationForm.getLocationInView('@completeButton', scrollPage(browser)).click('@completeButton')
                .waitForElementNotPresent('@nameInput', browser.globals.wait_milliseconds_short);

            browser.pause(browser.globals.wait_milliseconds_short);
            browser.refresh();
            browser.pause(browser.globals.wait_milliseconds_shortest);

            vaccinations.waitForElementVisible('@filterButton', browser.globals.wait_milliseconds_shortest)
                .getLocationInView('@filterButton', scrollPage(browser))
                .click('@filterButton')
                .waitForElementVisible('@filterInput', browser.globals.wait_milliseconds_short)
                .setValue('@filterInput', name);
            browser.pause(browser.globals.wait_milliseconds_short)
                .useXpath()
                .waitForElementVisible('//td[.="' + name + '"]', browser.globals.wait_milliseconds_short)
                .click('//td[.="' + name + '"]');

            const newName = newNameFirstPart;
            const newComment = 'immunisation_incomplete';
            const newSerial = '3';
            browser.pause(browser.globals.wait_milliseconds_short);
            browser.pause(browser.globals.wait_milliseconds_short);

            if (isEditingPossible(browser, 'vaccinations')) {
                createVaccinationForm.waitForElementVisible('@nameLabel', browser.globals.wait_milliseconds_short)
                    .assert.containsText('@nameLabel', name)
                    .assert.containsText('@commentLabel', comment)
                    .assert.containsText('@dateLabel', date)
                    .assert.containsText('@serialLabel', serial)
                    .getLocationInView('@editButton', scrollPage(browser))
                    .click('@editButton')
                    .waitForElementPresent('@nameInput', browser.globals.wait_milliseconds_short)
                    .clearValue('@nameInput')
                    .setValue('@nameInput', newName)
                    .clearValue('@commentInput')
                    .setValue('@commentInput', newComment)
                    .clearValue('@serialInput')
                    .setValue('@serialInput', newSerial)
                    .getLocationInView('@calendar', scrollPage(browser))
                    .click('@calendar');
                browser.pause(browser.globals.wait_milliseconds_shortest);

                const newDate = '20-Nov-2017';
                browser.globals.pickDate(browser, date);
                browser.pause(browser.globals.wait_milliseconds_shortest);

                browser.execute("window.scrollTo(0,document.body.scrollHeight);"); //scroll down
                createVaccinationForm.getLocationInView('@completeButton', scrollPage(browser)).click('@completeButton');

                browser.pause(browser.globals.wait_milliseconds);
                createVaccinationForm.waitForElementNotPresent('@nameInput', browser.globals.wait_milliseconds_short)
                    .waitForElementVisible('@nameLabel', browser.globals.wait_milliseconds_short)
                    .assert.containsText('@nameLabel', newName)
                    .assert.containsText('@commentLabel', newComment)
                    .assert.containsText('@serialLabel', newSerial)
                    .assert.containsText('@dateLabel', newDate);

                browser.globals.deleteCurrentItem(browser, tab);
            }
        }
        browser.end();
    }
};