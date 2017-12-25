module.exports = {
    'Patient Headings > Personal Notes': function (browser) {
        var dateFormat = require('dateformat');

        browser.page.loginPage()
            .login();

        var patientSummaryPage = browser.page.patientSummaryPage();

        patientSummaryPage.handlePopUp();

        leftBarMenu = patientSummaryPage.section.leftBarMenu;

        leftBarMenu.waitForElementVisible('@personalNotes', browser.globals.wait_milliseconds)
            .click('@personalNotes');

        personalNotes = patientSummaryPage.section.personalNotes;
        browser.pause(browser.globals.wait_milliseconds);
        personalNotes.waitForElementVisible('@createButton', browser.globals.wait_milliseconds)
            .click('@createButton');

        var createPersonalNoteForm = patientSummaryPage.section.createPersonalNoteForm;

        var type = 'Patient Note';
        var note = 'A bit poorly today';
        createPersonalNoteForm.waitForElementPresent('@typeInput', browser.globals.wait_milliseconds)
            .setValue('@typeInput', type)
            .setValue('@noteInput', note)
            // .setValue('@terminologyInput', 'no data')
            .click('@completeButton')
            .waitForElementNotPresent('@typeInput', browser.globals.wait_milliseconds);

        personalNotes.click('@filterButton')
            .waitForElementVisible('@filterInput', browser.globals.wait_milliseconds)
            .setValue('@filterInput', ' note');
        browser.pause(browser.globals.wait_milliseconds)
            .useXpath()
            .waitForElementVisible('//td[.="' + type + '"]', browser.globals.wait_milliseconds)
            .click('//td[.="' + type + '"]');

        var newType = 'Patient enquiry';
        var newNote = 'Need to ask about home care package';
        createPersonalNoteForm.waitForElementVisible('@typeLabel', browser.globals.wait_milliseconds)
            .assert.containsText('@typeLabel', type)
            .assert.containsText('@noteLabel', note)
            .assert.containsText('@dateLabel', dateFormat(new Date(), "dd-mmm-yyyy"))
            .assert.containsText('@sourceLabel', "ethercis")
            .click('@editButton')
            .waitForElementPresent('@typeInput', browser.globals.wait_milliseconds)
            .clearValue('@typeInput')
            .setValue('@typeInput', newType)
            .clearValue('@noteInput')
            .setValue('@noteInput', newNote)
            .click('@completeButton')
            .waitForElementNotPresent('@typeInput', browser.globals.wait_milliseconds)
            .waitForElementVisible('@typeLabel', browser.globals.wait_milliseconds)
            .assert.containsText('@typeLabel', newType)
            .assert.containsText('@noteLabel', newNote);

        browser.globals.deleteCurrentItem(browser, "personalnotes");

        browser.end();
    }
};