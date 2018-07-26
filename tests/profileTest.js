module.exports = {
    'User Profile drop-down': function (browser) {

        browser.page.loginPage()
            .login();

        browser.resizeWindow(1920, 1080);

        browser.page.patientSummaryPage()
            .handlePopUp();

        browser.pause(browser.globals.wait_milliseconds_shortest);
        var topBar = browser.page.topBar();

        topBar.waitForElementVisible('@userButton', browser.globals.wait_milliseconds)
            .click('@userButton');

        var userDetailsPopUp = topBar.section.userInfo;


        userDetailsPopUp.waitForElementVisible('@avatar', browser.globals.wait_milliseconds)
            // .assert.containsText('@name', 'Alen Mekka')
            .assert.containsText('@name', 'Ivor Cox')
            .assert.containsText('@userType', 'PHR')
            // .assert.containsText('@email', 'aschenputtel123912@gmail.com')
            .assert.containsText('@birthday', '10/05/2099')
            // .assert.containsText('@info', 'About Showcase Stack; PulseTile version 1.0.0/QEWD_Ripple version 1.0.0')
            .click('@avatar');

        var userProfilePage = browser.page.patientInformationPage();

        userProfilePage.waitForElementVisible('@header', browser.globals.wait_milliseconds);

        browser.end();
    }
};