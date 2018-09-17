module.exports = {
    'Breadcrumbs': function (browser) {
        browser.page.loginPage()
            .login();

        browser.resizeWindow(1920, 1080);

        var patientSummaryPage = browser.page.patientSummaryPage();

        patientSummaryPage.handlePopUp();

        leftBarMenu = patientSummaryPage.section.leftBarMenu;

        patientSummarySection = patientSummaryPage.section.patientSummary;

        var menuItems = browser.globals.settings.menuItems;
        var arrayLength = menuItems.length;
        for (var index = 0; index < arrayLength; index++) {
            var menuItem = menuItems[index];
            leftBarMenu.waitForElementVisible(menuItem, browser.globals.wait_milliseconds)
                .click(menuItem);

            patientSummarySection.waitForElementVisible('@title', browser.globals.wait_milliseconds);
        }

        browser.end();
    }
};