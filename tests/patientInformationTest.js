module.exports = {
    'Patient Information page': function (browser) {
        browser.page.loginPage()
            .login();

        var patientInformationPage = browser.page.patientInformationPage();

        patientInformationPage.navigate();


        patientInformationPage.section.preferences.waitForElementVisible('@title', browser.globals.wait_milliseconds)
            .assert.containsText('@title', 'Application preferences');
        patientInformationPage.section.personalInfo.assert.containsText('@title', 'Personal Information');
        patientInformationPage.section.contacts.assert.containsText('@title', 'Contact Information');
        patientInformationPage.section.changeHistory.assert.containsText('@title', 'Change History');

        browser.end();
    }
};