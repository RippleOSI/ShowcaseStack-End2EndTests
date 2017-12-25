module.exports = {
    'Patient Headings > Problems/Diagnosis': function (browser) {

        browser.page.loginPage()
            .login();

        var patientSummaryPage = browser.page.patientSummaryPage();

        patientSummaryPage.handlePopUp();

        leftBarMenu = patientSummaryPage.section.leftBarMenu;

        leftBarMenu.waitForElementVisible('@problems', browser.globals.wait_milliseconds)
            .click('@problems');

        problems = patientSummaryPage.section.problems;
        browser.pause(browser.globals.wait_milliseconds);
        problems.waitForElementVisible('@createButton', browser.globals.wait_milliseconds)
            .click('@createButton');

        createProblemForm = patientSummaryPage.section.createProblemForm;

        const name = 'bronchitis';
        createProblemForm.waitForElementPresent('@problemInput', browser.globals.wait_milliseconds)
            .setValue('@problemInput', name)
            .click('@calendar');
        browser.pause(browser.globals.wait_milliseconds);

        const date = '20-Nov-2017';
        browser.globals.pickDate(browser, date);
        browser.pause(browser.globals.wait_milliseconds);

        const description = 'Bronchitis is inflammation of the bronchi in the lungs.';
        createProblemForm.setValue('@descriptionInput', description)
            .setValue('@terminologyInput', "no data");
        browser.execute("window.scrollTo(0,document.body.scrollHeight);"); //scroll down
        createProblemForm.click('@completeButton')
            .waitForElementNotPresent('@problemInput', browser.globals.wait_milliseconds);

        problems.click('@filterButton')
            .waitForElementVisible('@filterInput', browser.globals.wait_milliseconds)
            // .setValue('@filterInput', 'eth')
            .setValue('@filterInput', 'ess');
        browser.pause(browser.globals.wait_milliseconds)
            .useXpath()
            .waitForElementVisible('//td[.="' + name + '"]', browser.globals.wait_milliseconds)
            .click('//td[.="' + name + '"]');

        const chronic = " chronic";
        const newName = name + chronic;
        const newDescription = description + chronic;
        browser.pause(browser.globals.wait_milliseconds);
        browser.pause(browser.globals.wait_milliseconds);
        createProblemForm.waitForElementVisible('@problemLabel', browser.globals.wait_milliseconds)
            .assert.containsText('@problemLabel', name)
            .assert.containsText('@descriptionLabel', description)
            .assert.containsText('@dateLabel', date)
            .assert.visible('@terminologyLabel')
            .click('@editButton')
            .waitForElementPresent('@problemInput', browser.globals.wait_milliseconds)
            .setValue('@problemInput', chronic)
            .setValue('@descriptionInput', chronic);
        browser.pause(browser.globals.wait_milliseconds);
        browser.execute("window.scrollTo(0,document.body.scrollHeight);"); //scroll down
        createProblemForm.click('@completeButton')
            .waitForElementNotPresent('@problemInput', browser.globals.wait_milliseconds)
            .waitForElementVisible('@problemLabel', browser.globals.wait_milliseconds)
            .assert.containsText('@problemLabel', newName)
            .assert.containsText('@descriptionLabel', newDescription)
            .assert.containsText('@dateLabel', date);

        browser.globals.deleteCurrentItem(browser, "problems");

        browser.end();
    }
};