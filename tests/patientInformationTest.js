module.exports = {
    'Patient Information page': function (browser) {
        browser.page.loginPage()
            .login();

        browser.resizeWindow(1920, 1080);

        var patientInformationPage = browser.page.patientInformationPage();

        patientInformationPage.navigate();

        browser.pause(browser.globals.wait_milliseconds_shortest);
        patientInformationPage.section.preferences.waitForElementPresent('@title', browser.globals.wait_milliseconds)
            .assert.containsText('@title', 'Application Preferences');
        patientInformationPage.section.personalInfo.assert.containsText('@title', 'Personal Information');
        patientInformationPage.section.contacts.assert.containsText('@title', 'Contact Information');
        patientInformationPage.section.changeHistory.assert.containsText('@title', 'Change History');

        browser.end();
    }
};