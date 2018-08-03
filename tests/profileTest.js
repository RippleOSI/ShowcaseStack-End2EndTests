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

        userDetailsPopUp.waitForElementVisible('@avatar', browser.globals.wait_milliseconds)
            .assert.containsText('@name', userProfileInfo.name)
            .assert.containsText('@userType', userProfileInfo.userType)
            .assert.containsText('@email', userProfileInfo.email)
            .assert.containsText('@birthday', userProfileInfo.birthday)
            .click('@avatar');

        var userProfilePage = browser.page.patientInformationPage();

        userProfilePage.waitForElementVisible('@header', browser.globals.wait_milliseconds);

        browser.end();
    }
};