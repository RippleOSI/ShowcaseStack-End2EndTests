const scrollPage = require('../utils/scrollPage.js');

module.exports = {
    'Patient Headings Contacts': function (browser) {
        var dateFormat = require('dateformat');

        browser.page.loginPage()
            .login();

        browser.resizeWindow(1920, 1080);

        var patientSummaryPage = browser.page.patientSummaryPage();

        const tab = "contacts";
        const newNameFirstPart = 'braun';
        const nameFirstPart = 'evan';

        browser.globals.deleteTestItems(browser, tab, "name", nameFirstPart);
        browser.globals.deleteTestItems(browser, tab, "name", newNameFirstPart);

        patientSummaryPage.handlePopUp();

        browser.pause(browser.globals.wait_milliseconds_shortest);
        leftBarMenu = patientSummaryPage.section.leftBarMenu;

        leftBarMenu.waitForElementVisible('@contacts', browser.globals.wait_milliseconds_short)
            .click('@contacts');

        contacts = patientSummaryPage.section.contacts;
        browser.pause(browser.globals.wait_milliseconds_short);
        contacts.waitForElementVisible('@createButton', browser.globals.wait_milliseconds_short)
            .getLocationInView('@createButton', scrollPage(browser))
            .click('@createButton');

        var createContactForm = patientSummaryPage.section.createContactForm;

        const name = nameFirstPart;

        createContactForm.waitForElementPresent('@nameInput', browser.globals.wait_milliseconds_short)
            .setValue('@nameInput', name)
            .getLocationInView('@relationshipSelect', scrollPage(browser))
            .click('@relationshipSelect')
            .waitForElementVisible('option', browser.globals.wait_milliseconds_short)
            .click('option[value="Husband"]')
            .getLocationInView('@relationshipTypeSelect', scrollPage(browser))
            .click('@relationshipTypeSelect')
            .waitForElementVisible('option', browser.globals.wait_milliseconds_short);
        browser.useXpath().click('//option[.="Informal carer"]');
        createContactForm.getLocationInView('@nameInput', scrollPage(browser))
            .click('@nameInput')
            .click('@nextOfKinCheckbox')
            .setValue('@infoInput', '01234533')
            .setValue('@noteInput', 'works_abroad');
        createContactForm.getLocationInView('@completeButton', scrollPage(browser))
            .click('@completeButton')
            .waitForElementNotPresent('@nameInput', browser.globals.wait_milliseconds_short);

        browser.pause(browser.globals.wait_milliseconds_short);
        browser.refresh();
        browser.pause(browser.globals.wait_milliseconds_shortest);

        contacts.waitForElementVisible('@filterButton', browser.globals.wait_milliseconds_shortest)
            .getLocationInView('@filterButton', scrollPage(browser))
            .click('@filterButton')
            .waitForElementVisible('@filterInput', browser.globals.wait_milliseconds_short)
            .setValue('@filterInput', name);
        browser.useXpath().waitForElementVisible('//td[.="' + name + '"]', browser.globals.wait_milliseconds_short)
            .click('//td[.="' + name + '"]');

        var newNote = 'works_abroad_2_weeks';
        var newInfo = '01234544';
        var newName = newNameFirstPart;
        createContactForm.click('@expandButton')
            .waitForElementVisible('@nameLabel', browser.globals.wait_milliseconds_short)
            .assert.containsText('@nameLabel', name)
            .assert.containsText('@relationshipLabel', "Husband")
            .assert.containsText('@relationshipTypeLabel', "Informal carer")
            .assert.containsText('@infoLabel', "01234533")
            .assert.containsText('@nextOfKinLabel', "Yes")
            .assert.containsText('@noteLabel', "works_abroad")
            .assert.containsText('@authorLabel', "@")
            // .assert.containsText('@authorLabel', "bob.smith@gmail.com")
            .assert.containsText('@dateLabel', dateFormat(new Date(), "dd-mmm-yyyy"))
            .assert.containsText('@sourceLabel', "ethercis")
            .getLocationInView('@editButton', scrollPage(browser))
            .click('@editButton')
            .waitForElementPresent('@nameInput', browser.globals.wait_milliseconds_short)
            .clearValue('@nameInput')
            .setValue('@nameInput', newName)
            .getLocationInView('@relationshipSelect', scrollPage(browser))
            .click('@relationshipSelect')
            .waitForElementVisible('option', browser.globals.wait_milliseconds_short)
            .click('option[value="Brother"]')
            .getLocationInView('@nextOfKinCheckbox', scrollPage(browser))
            .click('@nextOfKinCheckbox')
            .clearValue('@infoInput')
            .setValue('@infoInput', newInfo)
            .clearValue('@noteInput')
            .setValue('@noteInput', newNote)
            .getLocationInView('@completeButton', scrollPage(browser));
        browser.pause(browser.globals.wait_milliseconds_short);
        createContactForm.getLocationInView('@completeButton', scrollPage(browser)).click('@completeButton');

        browser.pause(browser.globals.wait_milliseconds);
        createContactForm.waitForElementNotPresent('@nameInput', browser.globals.wait_milliseconds_short)
            .waitForElementVisible('@nameLabel', browser.globals.wait_milliseconds_short)
            .assert.containsText('@nameLabel', newName)
            .assert.containsText('@relationshipLabel', "Brother")
            .assert.containsText('@relationshipTypeLabel', "Informal carer")
            .assert.containsText('@infoLabel', newInfo)
            .assert.containsText('@nextOfKinLabel', "No")
            .assert.containsText('@noteLabel', newNote);

        browser.globals.deleteCurrentItem(browser, tab);

        browser.end();
    }
};