const isTestChecked = require('../utils/isTestChecked.js');
const isTestForCurrentBase = require('../utils/isTestForCurrentBase');

module.exports = {
  'Patient Information page': function (browser) {
    if (isTestChecked(browser, "patientInformationTest") && isTestForCurrentBase(browser, "ReactJS")) {
      browser.page.loginPage().login();

      var patientInformationPage = browser.page.patientInformationPage();
      patientInformationPage.navigate();

      browser.pause(browser.globals.wait_milliseconds_shortest);
      patientInformationPage.section.preferences.waitForElementVisible('@title', browser.globals.wait_milliseconds)
        .assert.containsText('@title', 'Application Preferences');
      patientInformationPage.section.personalInfo.assert.containsText('@title', 'Personal Information');
      patientInformationPage.section.contacts.assert.containsText('@title', 'Contact Information');
      patientInformationPage.section.changeHistory.assert.containsText('@title', 'Change History');

      browser.end();
    }
  }
};