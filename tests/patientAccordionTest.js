module.exports = {
    'Patient Information (part of Accordion)': function (browser) {
        var dateFormat = require('dateformat');

        browser.page.loginPage()
            .login();

        browser.resizeWindow(1920, 1080);

        var patientInformationPage = browser.page.patientInformationPage();

        patientInformationPage.navigate();

        browser.pause(browser.globals.wait_milliseconds_shortest);
        var content = patientInformationPage.section.personalInfo
            .waitForElementVisible('@expandButton', browser.globals.wait_milliseconds)
            .click('@expandButton')
            .section.content;
        browser.pause(browser.globals.wait_milliseconds);

        var userInfo = browser.globals.settings.userInfo;

        content.waitForElementVisible('@firstNameValue', browser.globals.wait_milliseconds)
            .assert.containsText('@firstNameLabel', 'First Name')
            .assert.containsText('@firstNameValue', userInfo.firstname)
            .assert.containsText('@lastNameLabel', 'Last Name')
            .assert.containsText('@lastNameValue', userInfo.lastname)
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