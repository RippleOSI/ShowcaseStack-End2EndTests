module.exports = {
    'Patient Headings > Allergies': function (browser) {
        browser.page.loginPage()
            .login();

        var patientSummaryPage = browser.page.patientSummaryPage();

        patientSummaryPage.handlePopUp();

        leftBarMenu = patientSummaryPage.section.leftBarMenu;

        leftBarMenu.waitForElementVisible('@allergies', browser.globals.wait_milliseconds)
            .click('@allergies');

        allergies = patientSummaryPage.section.allergies;
        browser.pause(browser.globals.wait_milliseconds);
        allergies.waitForElementVisible('@createButton', browser.globals.wait_milliseconds)
            .click('@createButton');

        createAllergyForm = patientSummaryPage.section.createAllergyForm;

        createAllergyForm.waitForElementPresent('@causeInput', browser.globals.wait_milliseconds)
            .setValue('@causeInput', 'allergy to Aspirin')
            .setValue('@reactionInput', 'Fever')
            // .setValue('@terminologyInput', 'no data')
            .click('@completeButton')
            .waitForElementNotPresent('@causeInput', browser.globals.wait_milliseconds);

        allergies.click('@filterButton')
            .waitForElementVisible('@filterInput', browser.globals.wait_milliseconds)
            .setValue('@filterInput', 'asp')
            .section.table
            .waitForElementVisible('td[data-th="Cause"]', browser.globals.wait_milliseconds)
            .click('td[data-th="Cause"]');

        patientSummaryPage.section.allergiesMetadata
            .waitForElementVisible('@title', browser.globals.wait_milliseconds)
            .click('@expandButton')
            .waitForElementVisible('@causeCodeLabel', browser.globals.wait_milliseconds)
            .assert.visible('@terminologyLabel');

        createAllergyForm.click('@expandButton')
            .waitForElementVisible('@editButton', browser.globals.wait_milliseconds)
            .click('@editButton')
            .waitForElementPresent('@causeInput', browser.globals.wait_milliseconds)
            .clearValue('@causeInput')
            .setValue('@causeInput', 'Antibiotics')
            .clearValue('@reactionInput')
            .setValue('@reactionInput', 'Skin rash')
            .click('@completeButton')
            .waitForElementNotPresent('@causeInput', browser.globals.wait_milliseconds);

        browser.globals.deleteCurrentItem(browser, "allergies");

        browser.end();
    }
};