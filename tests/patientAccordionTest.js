module.exports = {
    'Patient Information (part of Accordion)': function (browser) {
        var dateFormat = require('dateformat');

        browser.page.loginPage()
            .login();

        var patientInformationPage = browser.page.patientInformationPage();

        patientInformationPage.navigate();

        var content = patientInformationPage.section.personalInfo
            .waitForElementVisible('@expandButton', browser.globals.wait_milliseconds)
            .click('@expandButton')
            .section.content;
        browser.pause(browser.globals.wait_milliseconds);

        content.waitForElementVisible('@firstNameValue', browser.globals.wait_milliseconds)
            .assert.containsText('@firstNameLabel', 'First Name')
            .assert.containsText('@firstNameValue', 'Alen')
            .assert.containsText('@lastNameLabel', 'Last Name')
            .assert.containsText('@lastNameValue', 'Mekka')
            .assert.containsText('@nhsNoLabel', 'NHS No')
            .assert.containsText('@nhsNoValue', '9999999000')
            .assert.containsText('@birthdayLabel', 'Date of Birth')
            .assert.containsText('@birthdayValue', dateFormat(new Date(), "dd-mmm-yyyy"))
            .assert.containsText('@genderLabel', 'Gender')
            .assert.containsText('@genderValue', 'Female')
            .assert.containsText('@doctorLabel', 'Doctor')
            .assert.containsText('@doctorValue', 'Dr Emma Huston');

        browser.end();
    }
};