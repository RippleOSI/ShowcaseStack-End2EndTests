module.exports = {
    'Patient Headings Personal Notes': function (browser) {
        var dateFormat = require('dateformat');

        browser.page.loginPage()
            .login();

        var patientSummaryPage = browser.page.patientSummaryPage();

        patientSummaryPage.handlePopUp();

        leftBarMenu = patientSummaryPage.section.leftBarMenu;

        leftBarMenu.waitForElementVisible('@personalNotes', browser.globals.wait_milliseconds_short)
            .click('@personalNotes');

        personalNotes = patientSummaryPage.section.personalNotes;
        browser.pause(browser.globals.wait_milliseconds_shortest);
        personalNotes.waitForElementVisible('@createButton', browser.globals.wait_milliseconds_shortest)
            .click('@createButton');

        var createPersonalNoteForm = patientSummaryPage.section.createPersonalNoteForm;

        var time = new Date().getTime();
        var type = 'Patient Note ' + time;
        var note = 'A bit poorly today';
        createPersonalNoteForm.waitForElementPresent('@typeInput', browser.globals.wait_milliseconds_short)
            .setValue('@typeInput', type)
            .setValue('@noteInput', note)
            // .setValue('@terminologyInput', 'no data')
            .click('@completeButton')
            .waitForElementNotPresent('@typeInput', browser.globals.wait_milliseconds_short);

        browser.pause(browser.globals.wait_milliseconds_short);
        browser.refresh();
        browser.pause(browser.globals.wait_milliseconds_shortest);

        personalNotes.waitForElementVisible('@filterButton', browser.globals.wait_milliseconds_shortest)
            .click('@filterButton')
            .waitForElementVisible('@filterInput', browser.globals.wait_milliseconds_shortest)
            .setValue('@filterInput', time);
        browser.pause(browser.globals.wait_milliseconds_short)
            .useXpath()
            .waitForElementVisible('//td[.="' + type + '"]', browser.globals.wait_milliseconds_shortest)
            .click('//td[.="' + type + '"]');

        browser.pause(browser.globals.wait_milliseconds_shortest);

        var newType = 'Patient enquiry ' + time;
        var newNote = 'Need to ask about home care package';
        createPersonalNoteForm.waitForElementVisible('@typeLabel', browser.globals.wait_milliseconds_short)
            .assert.containsText('@typeLabel', type)
            .assert.containsText('@noteLabel', note)
            .assert.containsText('@dateLabel', dateFormat(new Date(), "dd-mmm-yyyy"))
            .assert.containsText('@sourceLabel', "ethercis")
            .click('@editButton')
            .waitForElementPresent('@typeInput', browser.globals.wait_milliseconds_short)
            .clearValue('@typeInput')
            .setValue('@typeInput', newType)
            .clearValue('@noteInput')
            .setValue('@noteInput', newNote)
            .click('@completeButton');

        browser.pause(browser.globals.wait_milliseconds);

        createPersonalNoteForm.waitForElementNotPresent('@typeInput', browser.globals.wait_milliseconds_short)
            .waitForElementVisible('@typeLabel', browser.globals.wait_milliseconds_short)
            .assert.containsText('@typeLabel', newType)
            .assert.containsText('@noteLabel', newNote);

        browser.globals.deleteCurrentItem(browser, "personalnotes");

        browser.end();
    }
};