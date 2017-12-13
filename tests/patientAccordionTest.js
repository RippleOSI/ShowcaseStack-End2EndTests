module.exports = {
    'Patient Information (part of Accordion)': function (browser) {
        browser.page.loginPage()
            .login();

        var patientInformationPage = browser.page.patientInformationPage();

        patientInformationPage.navigate();

        patientInformationPage.section.personalInfo
            .waitForElementVisible('@expandButton', browser.globals.wait_milliseconds)
            .click('@expandButton')
            .section.content
            .waitForElementVisible('@firstNameLabel', browser.globals.wait_milliseconds)
            .assert.containsText('@firstNameLabel', 'First Name')
            .assert.containsText('@firstNameValue', 'Bob')
            .assert.containsText('@lastNameLabel', 'Last Name')
            .assert.containsText('@lastNameValue', 'Smith')
            .assert.containsText('@nhsNoLabel', 'NHS No')
            .assert.containsText('@nhsNoValue', '')
            .assert.containsText('@birthdayLabel', 'Date of Birth')
            .assert.containsText('@birthdayValue', '14-Dec-2017')
            .assert.containsText('@genderLabel', 'Gender')
            .assert.containsText('@genderValue', 'Female')
            .assert.containsText('@doctorLabel', 'Doctor')
            .assert.containsText('@doctorValue', 'Dr Emma Huston');

        browser.end();
    }
};