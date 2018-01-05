module.exports = {
    'Patient Headings Vaccinations': function (browser) {

        browser.page.loginPage()
            .login();

        var patientSummaryPage = browser.page.patientSummaryPage();

        patientSummaryPage.handlePopUp();

        leftBarMenu = patientSummaryPage.section.leftBarMenu;

        leftBarMenu.waitForElementVisible('@vaccinations', browser.globals.wait_milliseconds_short)
            .click('@vaccinations');

        var vaccinations = patientSummaryPage.section.vaccinations;
        browser.pause(browser.globals.wait_milliseconds_short);
        vaccinations.waitForElementVisible('@createButton', browser.globals.wait_milliseconds_short)
            .click('@createButton');

        var createVaccinationForm = patientSummaryPage.section.createVaccinationForm;

        var time = new Date().getTime();
        const name = 'Hepatitis A ' + time;
        createVaccinationForm.waitForElementPresent('@nameInput', browser.globals.wait_milliseconds_short)
            .setValue('@nameInput', name)
            .click('@calendar');
        browser.pause(browser.globals.wait_milliseconds_shortest);

        const date = '20-Nov-2017';
        browser.globals.pickDate(browser, date);
        browser.pause(browser.globals.wait_milliseconds_shortest);

        const comment = 'Immunisation complete';
        const serial = "2";
        createVaccinationForm.setValue('@commentInput', comment)
            .setValue('@serialInput', serial);
        browser.execute("window.scrollTo(0,document.body.scrollHeight);"); //scroll down
        createVaccinationForm.click('@completeButton')
            .waitForElementNotPresent('@nameInput', browser.globals.wait_milliseconds_short);

        browser.pause(browser.globals.wait_milliseconds_short);
        browser.refresh();
        browser.pause(browser.globals.wait_milliseconds_shortest);

        vaccinations.waitForElementVisible('@filterButton', browser.globals.wait_milliseconds_shortest)
            .click('@filterButton')
            .waitForElementVisible('@filterInput', browser.globals.wait_milliseconds_short)
            .setValue('@filterInput', time);
        browser.pause(browser.globals.wait_milliseconds_short)
            .useXpath()
            .waitForElementVisible('//td[.="' + name + '"]', browser.globals.wait_milliseconds_short)
            .click('//td[.="' + name + '"]');

        const newName = 'antigen ' + time;
        const newComment = 'Immunisation incomplete';
        const newSerial = '3';
        browser.pause(browser.globals.wait_milliseconds_short);
        browser.pause(browser.globals.wait_milliseconds_short);
        createVaccinationForm.waitForElementVisible('@nameLabel', browser.globals.wait_milliseconds_short)
            .assert.containsText('@nameLabel', name)
            .assert.containsText('@commentLabel', comment)
            .assert.containsText('@dateLabel', date)
            .assert.containsText('@serialLabel', serial)
            .click('@editButton')
            .waitForElementPresent('@nameInput', browser.globals.wait_milliseconds_short)
            .clearValue('@nameInput')
            .setValue('@nameInput', newName)
            .clearValue('@commentInput')
            .setValue('@commentInput', newComment)
            .clearValue('@serialInput')
            .setValue('@serialInput', newSerial)
            .click('@calendar');
        browser.pause(browser.globals.wait_milliseconds_shortest);

        const newDate = '20-Nov-2017';
        browser.globals.pickDate(browser, date);
        browser.pause(browser.globals.wait_milliseconds_shortest);

        browser.execute("window.scrollTo(0,document.body.scrollHeight);"); //scroll down
        createVaccinationForm.click('@completeButton');

        browser.pause(browser.globals.wait_milliseconds);
        createVaccinationForm.waitForElementNotPresent('@nameInput', browser.globals.wait_milliseconds_short)
            .waitForElementVisible('@nameLabel', browser.globals.wait_milliseconds_short)
            .assert.containsText('@nameLabel', newName)
            .assert.containsText('@commentLabel', newComment)
            .assert.containsText('@serialLabel', newSerial)
            .assert.containsText('@dateLabel', newDate);

        browser.globals.deleteCurrentItem(browser, "vaccinations");

        browser.end();
    }
};