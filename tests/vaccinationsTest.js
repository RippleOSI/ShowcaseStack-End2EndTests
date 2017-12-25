module.exports = {
    'Patient Headings > Vaccinations': function (browser) {

        browser.page.loginPage()
            .login();

        var patientSummaryPage = browser.page.patientSummaryPage();

        patientSummaryPage.handlePopUp();

        leftBarMenu = patientSummaryPage.section.leftBarMenu;

        leftBarMenu.waitForElementVisible('@vaccinations', browser.globals.wait_milliseconds)
            .click('@vaccinations');

        var vaccinations = patientSummaryPage.section.vaccinations;
        browser.pause(browser.globals.wait_milliseconds);
        vaccinations.waitForElementVisible('@createButton', browser.globals.wait_milliseconds)
            .click('@createButton');

        var createVaccinationForm = patientSummaryPage.section.createVaccinationForm;

        const name = 'lupus';
        // const name = 'Hepatitis A';
        createVaccinationForm.waitForElementPresent('@nameInput', browser.globals.wait_milliseconds)
            .setValue('@nameInput', name)
            .click('@calendar');
        browser.pause(browser.globals.wait_milliseconds);

        const date = '20-Nov-2017';
        browser.globals.pickDate(browser, date);
        browser.pause(browser.globals.wait_milliseconds);

        const comment = 'Immunisation complete';
        const serial = "2";
        createVaccinationForm.setValue('@commentInput', comment)
            .setValue('@serialInput', serial);
        browser.execute("window.scrollTo(0,document.body.scrollHeight);"); //scroll down
        createVaccinationForm.click('@completeButton')
            .waitForElementNotPresent('@nameInput', browser.globals.wait_milliseconds);

        vaccinations.click('@filterButton')
            .waitForElementVisible('@filterInput', browser.globals.wait_milliseconds)
            // .setValue('@filterInput', ' hepa')
            .setValue('@filterInput', ' upu');
        browser.pause(browser.globals.wait_milliseconds)
            .useXpath()
            .waitForElementVisible('//td[.="' + name + '"]', browser.globals.wait_milliseconds)
            .click('//td[.="' + name + '"]');

        const newName = 'antigen';
        const newComment = 'Immunisation incomplete';
        const newSerial = '3';
        browser.pause(browser.globals.wait_milliseconds);
        browser.pause(browser.globals.wait_milliseconds);
        createVaccinationForm.waitForElementVisible('@nameLabel', browser.globals.wait_milliseconds)
            .assert.containsText('@nameLabel', name)
            .assert.containsText('@commentLabel', comment)
            .assert.containsText('@dateLabel', date)
            .assert.containsText('@serialLabel', serial)
            .click('@editButton')
            .waitForElementPresent('@nameInput', browser.globals.wait_milliseconds)
            .clearValue('@nameInput')
            .setValue('@nameInput', newName)
            .clearValue('@commentInput')
            .setValue('@commentInput', newComment)
            .clearValue('@serialInput')
            .setValue('@serialInput', newSerial)
            .click('@calendar');
        browser.pause(browser.globals.wait_milliseconds);

        const newDate = '20-Nov-2017';
        browser.globals.pickDate(browser, date);
        browser.pause(browser.globals.wait_milliseconds);

        browser.execute("window.scrollTo(0,document.body.scrollHeight);"); //scroll down
        createVaccinationForm.click('@completeButton')
            .waitForElementNotPresent('@nameInput', browser.globals.wait_milliseconds)
            .waitForElementVisible('@nameLabel', browser.globals.wait_milliseconds)
            .assert.containsText('@nameLabel', newName)
            .assert.containsText('@commentLabel', newComment)
            .assert.containsText('@serialLabel', newSerial)
            .assert.containsText('@dateLabel', newDate);

        browser.globals.deleteCurrentItem(browser, "vaccinations");

        browser.end();
    }
};