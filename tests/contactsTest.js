module.exports = {
    'Patient Headings > Contacts': function (browser) {
        var dateFormat = require('dateformat');

        browser.page.loginPage()
            .login();

        var patientSummaryPage = browser.page.patientSummaryPage();

        patientSummaryPage.handlePopUp();

        leftBarMenu = patientSummaryPage.section.leftBarMenu;

        leftBarMenu.waitForElementVisible('@contacts', browser.globals.wait_milliseconds)
            .click('@contacts');

        contacts = patientSummaryPage.section.contacts;
        browser.pause(browser.globals.wait_milliseconds);
        contacts.waitForElementVisible('@createButton', browser.globals.wait_milliseconds)
            .click('@createButton');

        var createContactForm = patientSummaryPage.section.createContactForm;

        const name = 'Evan Smith';

        createContactForm.waitForElementPresent('@nameInput', browser.globals.wait_milliseconds)
            .setValue('@nameInput', name)
            .click('@relationshipSelect')
            .waitForElementVisible('option', browser.globals.wait_milliseconds)
            .click('option[value="Husband"]')
            .click('@relationshipTypeSelect')
            .waitForElementVisible('option', browser.globals.wait_milliseconds);
        browser.useXpath().click('//option[.="Informal carer"]');
        createContactForm.click('@nameInput')
            .click('@nextOfKinCheckbox')
            .setValue('@infoInput', '012345 33466')
            .setValue('@noteInput', 'works abroad');
        browser.execute("window.scrollTo(0,document.body.scrollHeight);"); //scroll down
        createContactForm.getLocationInView('@completeButton')
            .click('@completeButton')
            .waitForElementNotPresent('@nameInput', browser.globals.wait_milliseconds);

        contacts.click('@filterButton')
            .waitForElementVisible('@filterInput', browser.globals.wait_milliseconds)
            .setValue('@filterInput', 'van');
        browser.useXpath().waitForElementVisible('//td[.="' + name + '"]', browser.globals.wait_milliseconds)
            .click('//td[.="' + name + '"]');

        patientSummaryPage.section.contactsMetadata
            .waitForElementVisible('@title', browser.globals.wait_milliseconds)
            .click('@expandButton');
        browser.pause(browser.globals.wait_milliseconds);
        browser.pause(browser.globals.wait_milliseconds);
        patientSummaryPage.section.contactsMetadata
            .waitForElementVisible('@relationshipCodeLabel', browser.globals.wait_milliseconds)
            .assert.containsText('@relationshipCodeLabel', 'at0036')
            .assert.containsText('@terminologyLabel', 'local');

        var newNote = 'works abroad 2 weeks';
        var newInfo = '012345 33452';
        var newName = "Braun Smith";
        createContactForm.click('@expandButton')
            .waitForElementVisible('@nameLabel', browser.globals.wait_milliseconds)
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
            .waitForElementPresent('@nameInput', browser.globals.wait_milliseconds)
            .clearValue('@nameInput')
            .setValue('@nameInput', newName)
            .click('@relationshipSelect')
            .waitForElementVisible('option', browser.globals.wait_milliseconds)
            .click('option[value="Brother"]')
            .click('@nextOfKinCheckbox')
            .clearValue('@infoInput')
            .setValue('@infoInput', newInfo)
            .clearValue('@noteInput')
            .setValue('@noteInput', newNote)
            .getLocationInView('@completeButton');
        browser.execute("window.scrollTo(0,document.body.scrollHeight);"); //scroll down
        browser.pause(browser.globals.wait_milliseconds);
        browser.pause(browser.globals.wait_milliseconds);
        createContactForm.click('@completeButton')
            .waitForElementNotPresent('@nameInput', browser.globals.wait_milliseconds)
            .waitForElementVisible('@nameLabel', browser.globals.wait_milliseconds)
            .assert.containsText('@nameLabel', newName)
            .assert.containsText('@relationshipLabel', "Brother")
            .assert.containsText('@relationshipTypeLabel', "Informal carer")
            .assert.containsText('@infoLabel', newInfo)
            .assert.containsText('@nextOfKinLabel', "No")
            .assert.containsText('@noteLabel', newNote);


        patientSummaryPage.section.contactsMetadata
            .waitForElementVisible('@title', browser.globals.wait_milliseconds)
            .click('@expandButton')
            .waitForElementVisible('@relationshipCodeLabel', browser.globals.wait_milliseconds)
            .assert.containsText('@relationshipCodeLabel', 'at0037')
            .assert.containsText('@terminologyLabel', 'local');

        browser.globals.deleteCurrentItem(browser, "contacts");

        browser.end();
    }
};