module.exports = {
    'User Profile drop-down': function (browser) {
        browser.page.loginPage()
            .login();

        browser.resizeWindow(1920, 1080);

        browser.page.patientSummaryPage()
            .handlePopUp();

        browser.pause(browser.globals.wait_milliseconds_shortest);

        var topBar = (browser.globals.settings.version === 'showcase') ? browser.page.topBarShowcase() : browser.page.topBar();
        topBar.waitForElementVisible('@userButton', browser.globals.wait_milliseconds)
            .click('@userButton');

        var userDetailsPopUp = topBar.section.userInfo;
        var userProfileInfo = browser.globals.settings.userProfile;

        userDetailsPopUp
            .assert.containsText('@name', userProfileInfo.name)
            .assert.containsText('@userType', userProfileInfo.userType);

        userProfileInfo.email ? userDetailsPopUp.assert.containsText('@email', userProfileInfo.email) : null;
        userProfileInfo.birthday ? userDetailsPopUp.assert.containsText('@birthday', userProfileInfo.birthday) : null;

        if (userProfileInfo.avatar) {
            userDetailsPopUp
                .waitForElementVisible('@avatar', browser.globals.wait_milliseconds)
                .click('@avatar');
            var userProfilePage = browser.page.patientInformationPage();
            userProfilePage.waitForElementVisible('@header', browser.globals.wait_milliseconds);
        }

        browser.end();
    }
};