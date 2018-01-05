module.exports = {
    'Patient Headings Contacts': function (browser) {
        var dateFormat = require('dateformat');

        browser.page.loginPage()
            .login();

        var patientSummaryPage = browser.page.patientSummaryPage();

        patientSummaryPage.handlePopUp();

        leftBarMenu = patientSummaryPage.section.leftBarMenu;

        leftBarMenu.waitForElementVisible('@contacts', browser.globals.wait_milliseconds_short)
            .click('@contacts');

        contacts = patientSummaryPage.section.contacts;
        browser.pause(browser.globals.wait_milliseconds_short);
        contacts.waitForElementVisible('@createButton', browser.globals.wait_milliseconds_short)
            .click('@createButton');

        var createContactForm = patientSummaryPage.section.createContactForm;

        var time = new Date().getTime();
        const name = 'Evan Smith ' + time;

        createContactForm.waitForElementPresent('@nameInput', browser.globals.wait_milliseconds_short)
            .setValue('@nameInput', name)
            .click('@relationshipSelect')
            .waitForElementVisible('option', browser.globals.wait_milliseconds_short)
            .click('option[value="Husband"]')
            .click('@relationshipTypeSelect')
            .waitForElementVisible('option', browser.globals.wait_milliseconds_short);
        browser.useXpath().click('//option[.="Informal carer"]');
        createContactForm.click('@nameInput')
            .click('@nextOfKinCheckbox')
            .setValue('@infoInput', '012345 33466')
            .setValue('@noteInput', 'works abroad');
        browser.execute("window.scrollTo(0,document.body.scrollHeight);"); //scroll down
        createContactForm.getLocationInView('@completeButton')
            .click('@completeButton')
            .waitForElementNotPresent('@nameInput', browser.globals.wait_milliseconds_short);

        browser.pause(browser.globals.wait_milliseconds_short);
        browser.refresh();
        browser.pause(browser.globals.wait_milliseconds_shortest);

        contacts.waitForElementVisible('@filterButton', browser.globals.wait_milliseconds_shortest)
            .click('@filterButton')
            .waitForElementVisible('@filterInput', browser.globals.wait_milliseconds_short)
            .setValue('@filterInput', time);
        browser.useXpath().waitForElementVisible('//td[.="' + name + '"]', browser.globals.wait_milliseconds_short)
            .click('//td[.="' + name + '"]');

        var newNote = 'works abroad 2 weeks';
        var newInfo = '012345 33452';
        var newName = 'Braun Smith ' + time;
        createContactForm.click('@expandButton')
            .waitForElementVisible('@nameLabel', browser.globals.wait_milliseconds_short)
            .assert.containsText('@nameLabel', name)
            .assert.containsText('@relationshipLabel', "Husband")
            .assert.containsText('@relationshipTypeLabel', "Informal carer")
            .assert.containsText('@infoLabel', "012345 33466")
            .assert.containsText('@nextOfKinLabel', "Yes")
            .assert.containsText('@noteLabel', "works abroad")
            .assert.containsText('@authorLabel', "@")
            // .assert.containsText('@authorLabel', "bob.smith@gmail.com")
            .assert.containsText('@dateLabel', dateFormat(new Date(), "dd-mmm-yyyy"))
            .assert.containsText('@sourceLabel', "ethercis")
            .click('@editButton')
            .waitForElementPresent('@nameInput', browser.globals.wait_milliseconds_short)
            .clearValue('@nameInput')
            .setValue('@nameInput', newName)
            .click('@relationshipSelect')
            .waitForElementVisible('option', browser.globals.wait_milliseconds_short)
            .click('option[value="Brother"]')
            .click('@nextOfKinCheckbox')
            .clearValue('@infoInput')
            .setValue('@infoInput', newInfo)
            .clearValue('@noteInput')
            .setValue('@noteInput', newNote)
            .getLocationInView('@completeButton');
        browser.execute("window.scrollTo(0,document.body.scrollHeight);"); //scroll down
        browser.pause(browser.globals.wait_milliseconds_short);
        browser.pause(browser.globals.wait_milliseconds_short);
        createContactForm.click('@completeButton');

        browser.pause(browser.globals.wait_milliseconds);
        createContactForm.waitForElementNotPresent('@nameInput', browser.globals.wait_milliseconds_short)
            .waitForElementVisible('@nameLabel', browser.globals.wait_milliseconds_short)
            .assert.containsText('@nameLabel', newName)
            .assert.containsText('@relationshipLabel', "Brother")
            .assert.containsText('@relationshipTypeLabel', "Informal carer")
            .assert.containsText('@infoLabel', newInfo)
            .assert.containsText('@nextOfKinLabel', "No")
            .assert.containsText('@noteLabel', newNote);

        browser.globals.deleteCurrentItem(browser, "contacts");

        browser.end();
    }
};