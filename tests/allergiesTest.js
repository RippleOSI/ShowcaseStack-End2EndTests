module.exports = {
    'Patient Headings Allergies': function (browser) {
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

        var createAllergyForm = patientSummaryPage.section.createAllergyForm;

        var cause = 'allergy to Aspirin';
        var reaction = 'Fever';
        createAllergyForm.waitForElementPresent('@causeInput', browser.globals.wait_milliseconds)
            .setValue('@causeInput', cause)
            .setValue('@reactionInput', reaction)
            // .setValue('@terminologyInput', 'no data')
            .click('@completeButton')
            .waitForElementNotPresent('@causeInput', browser.globals.wait_milliseconds);

        allergies.click('@filterButton')
            .waitForElementVisible('@filterInput', browser.globals.wait_milliseconds)
            .setValue('@filterInput', 'asp')
            .section.table
            .waitForElementVisible('td[data-th="Cause"]', browser.globals.wait_milliseconds)
            .click('td[data-th="Cause"]');

        createAllergyForm.waitForElementVisible('@causeLabel', browser.globals.wait_milliseconds)
            .assert.containsText('@causeLabel', cause)
            .assert.containsText('@reactionLabel', reaction);

        patientSummaryPage.section.allergiesMetadata
            .waitForElementVisible('@title', browser.globals.wait_milliseconds)
            .click('@expandButton')
            .waitForElementVisible('@causeCodeLabel', browser.globals.wait_milliseconds)
            .assert.visible('@terminologyLabel');

        var newCause = 'Antibiotics';
        var newReaction = 'Skin rash';
        createAllergyForm.click('@expandButton')
            .waitForElementVisible('@editButton', browser.globals.wait_milliseconds)
            .click('@editButton')
            .waitForElementPresent('@causeInput', browser.globals.wait_milliseconds)
            .clearValue('@causeInput')
            .setValue('@causeInput', newCause)
            .clearValue('@reactionInput')
            .setValue('@reactionInput', newReaction)
            .click('@completeButton')
            .waitForElementNotPresent('@causeInput', browser.globals.wait_milliseconds)
            .waitForElementVisible('@causeLabel', browser.globals.wait_milliseconds)
            .assert.containsText('@causeLabel', newCause)
            .assert.containsText('@reactionLabel', newReaction);

        browser.globals.deleteCurrentItem(browser, "allergies");

        browser.end();
    }
};