module.exports = {
    'User login (Patient banner)': function (browser) {
        browser.url(browser.launchUrl);

        var loginPage = browser.page.loginPage();
        loginPage.waitForElementVisible('@loginInput', browser.globals.wait_milliseconds)
            .assert.visible('@passwordInput')
            .assert.visible('@loginButton')
            .setValue('@loginInput', 'Alen')
            .setValue('@passwordInput', '070790')
            .click('@loginButton')
            .waitForElementNotPresent('@loginButton', browser.globals.wait_milliseconds);

        var patientSummaryPage = browser.page.patientSummaryPage();

        browser.pause(browser.globals.wait_milliseconds);
        browser.pause(browser.globals.wait_milliseconds);

        patientSummaryPage.handlePopUp();

        var patientInfoSection = patientSummaryPage.section.patientInfo;

        patientInfoSection.waitForElementVisible('@name', browser.globals.wait_milliseconds)
            .assert.containsText('@name', 'Ivor Cox')
            .assert.containsText('@doctor', 'Doctor: Goff Carolyn D.')
            .assert.containsText('@address', 'Address: Hamilton Practice, 5544 Ante Street, Hamilton, Lanarkshire, N06 5LP')
            .assert.containsText('@birthday', 'D.O.B. 06-Jun-1944')
            .assert.containsText('@phone', 'Phone: (011981) 32362')
            .assert.containsText('@gender', 'Gender: Male')
            .assert.containsText('@number', 'NHS No. 999 999 9000');

        browser.end();
    }
};