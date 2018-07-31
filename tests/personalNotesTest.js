const scrollPage = require('../utils/scrollPage.js');
const isTestChecked = require('../utils/isTestChecked.js');

module.exports = {
    'Patient Headings Personal Notes': function (browser) {
        var dateFormat = require('dateformat');
        if (isTestChecked(browser, "personalNotesTest")) {
            browser.end();
        } else {
            browser.page.loginPage()
                .login();

            browser.resizeWindow(1920, 1080);

            var patientSummaryPage = browser.page.patientSummaryPage();

            patientSummaryPage.handlePopUp();

            const tab = "personalnotes";

            const patientEnquiry = 'patient_enquiry';
            const patientNote = 'patient_note';

            browser.globals.deleteTestItems(browser, tab, "noteType", patientNote);
            browser.globals.deleteTestItems(browser, tab, "noteType", patientEnquiry);

            browser.pause(browser.globals.wait_milliseconds_shortest);
            leftBarMenu = patientSummaryPage.section.leftBarMenu;

            leftBarMenu.waitForElementVisible('@personalNotes', browser.globals.wait_milliseconds_short)
                .click('@personalNotes');

            personalNotes = patientSummaryPage.section.personalNotes;
            browser.pause(browser.globals.wait_milliseconds_shortest);
            personalNotes.waitForElementVisible('@createButton', browser.globals.wait_milliseconds_shortest)
                .getLocationInView('@createButton', scrollPage(browser))
                .click('@createButton');

            var createPersonalNoteForm = patientSummaryPage.section.createPersonalNoteForm;

            var type = patientNote;
            var note = 'a_bit_poorly_today';
            createPersonalNoteForm.waitForElementPresent('@typeInput', browser.globals.wait_milliseconds_short)
                .setValue('@typeInput', type)
                .setValue('@noteInput', note)
                // .setValue('@terminologyInput', 'no data')
                .getLocationInView('@completeButton', scrollPage(browser))
                .click('@completeButton')
                .waitForElementNotPresent('@typeInput', browser.globals.wait_milliseconds_short);

            browser.pause(browser.globals.wait_milliseconds_short);
            browser.refresh();
            browser.pause(browser.globals.wait_milliseconds_shortest);

            personalNotes.waitForElementVisible('@filterButton', browser.globals.wait_milliseconds_shortest)
                .getLocationInView('@filterButton', scrollPage(browser))
                .click('@filterButton')
                .waitForElementVisible('@filterInput', browser.globals.wait_milliseconds_shortest)
                .setValue('@filterInput', patientNote);
            browser.pause(browser.globals.wait_milliseconds_short)
                .useXpath()
                .waitForElementVisible('//td[.="' + type + '"]', browser.globals.wait_milliseconds_shortest)
                .click('//td[.="' + type + '"]');

            browser.pause(browser.globals.wait_milliseconds_shortest);

            var newType = patientEnquiry;
            var newNote = 'need_to_ask_about_home_care_package';
            createPersonalNoteForm.waitForElementVisible('@typeLabel', browser.globals.wait_milliseconds_short)
                .assert.containsText('@typeLabel', type)
                .assert.containsText('@noteLabel', note)
                .assert.containsText('@dateLabel', dateFormat(new Date(), "dd-mmm-yyyy"))
                .assert.containsText('@sourceLabel', "ethercis")
                .getLocationInView('@editButton', scrollPage(browser))
                .click('@editButton')
                .waitForElementPresent('@typeInput', browser.globals.wait_milliseconds_short)
                .clearValue('@typeInput')
                .setValue('@typeInput', newType)
                .clearValue('@noteInput')
                .setValue('@noteInput', newNote)
                .getLocationInView('@completeButton', scrollPage(browser))
                .click('@completeButton');

            browser.pause(browser.globals.wait_milliseconds);

            createPersonalNoteForm.waitForElementNotPresent('@typeInput', browser.globals.wait_milliseconds_short)
                .waitForElementVisible('@typeLabel', browser.globals.wait_milliseconds_short)
                .assert.containsText('@typeLabel', newType)
                .assert.containsText('@noteLabel', newNote);

            browser.globals.deleteCurrentItem(browser, tab);

            browser.end();
        }
    }
};