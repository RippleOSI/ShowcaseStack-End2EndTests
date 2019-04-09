module.exports = {
    'User login (Patient banner)': function (browser) {
        browser.url(browser.launchUrl);
        var loginPage = browser.page.loginPage();
        loginPage.waitForElementVisible(browser.globals.settings.userLoginInput, browser.globals.wait_milliseconds)
            .assert.visible(browser.globals.settings.userPasswordInput)
            .assert.visible(browser.globals.settings.loginButton)
            .setValue(browser.globals.settings.userLoginInput, browser.globals.settings.userLogin)
            .setValue(browser.globals.settings.userPasswordInput, browser.globals.settings.userPassword)
            .click(browser.globals.settings.loginButton);

        if (browser.globals.settings.hasTermsAndConditions) {
            var agreeButton = browser.globals.settings.agreeButton;
            loginPage.waitForElementVisible(agreeButton, browser.globals.wait_milliseconds_shortest)
                .click(agreeButton)
                .waitForElementNotPresent(agreeButton, browser.globals.wait_milliseconds);
        }

        var patientSummaryPage = browser.page.patientSummaryPage();

        browser.pause(browser.globals.wait_milliseconds);

        patientSummaryPage.handlePopUp();

        var patientInfoSection = patientSummaryPage.section.patientInfo;

        var patientBannerInfo = browser.globals.settings.patientBannerInfo;

        patientInfoSection.waitForElementVisible('@name', browser.globals.wait_milliseconds)
            .assert.containsText('@name', patientBannerInfo.name)
            .assert.containsText('@doctor', patientBannerInfo.doctor)
            .assert.containsText('@address', patientBannerInfo.address)
            .assert.containsText('@birthday', patientBannerInfo.birthday)
            .assert.containsText('@phone', patientBannerInfo.phone)
            .assert.containsText('@gender', patientBannerInfo.gender)
            .assert.containsText('@number', patientBannerInfo.number);

        browser.end();
    }
};