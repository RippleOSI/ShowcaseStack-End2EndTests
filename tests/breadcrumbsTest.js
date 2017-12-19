module.exports = {
    'Breadcrumbs': function (browser) {
        browser.page.loginPage()
            .login();

        var patientSummaryPage = browser.page.patientSummaryPage();

        patientSummaryPage.handlePopUp();

        leftBarMenu = patientSummaryPage.section.leftBarMenu;

        patientSummarySection = patientSummaryPage.section.patientSummary;

        var menuItems = ['@problems', '@contacts', '@medications', '@allergies', '@clinicalNotes', '@personalNotes', '@vaccinations'];
        var arrayLength = menuItems.length;
        for (var index = 0; index < arrayLength; index++) {
            var menuItem = menuItems[index];
            console.log(menuItem);
            leftBarMenu.waitForElementVisible(menuItem, browser.globals.wait_milliseconds)
                .click(menuItem);

            patientSummarySection.waitForElementVisible('@title', browser.globals.wait_milliseconds);
        }

        browser.end();
    }
};