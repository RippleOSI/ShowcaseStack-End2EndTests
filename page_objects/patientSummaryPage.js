var patientSummaryCommands = {
    handlePopUp: function () {
        try {
            this.waitForElementPresent('@popUpButtonOk', this.globals.wait_milliseconds);
            this.isVisible('@popUpButtonOk', function (result) {
                this.assert.equal(typeof result, "object");
                console.log(result.value);
                if (result.value === true) {
                    console.log('!!clicking');
                    console.log(this);
                    this.click('@popUpButtonOk')
                }
            });
            this.waitForElementNotPresent('@popUpButtonOk', this.globals.wait_milliseconds);
        } catch (ex) {
            console.log(ex);
        }
    }
};

module.exports = {
    commands: [patientSummaryCommands],
    sections: {
        patientInfo: {
            selector: "div.patient-info",
            elements: {
                name: {
                    selector: "div[@class='patient-info-group-1']/div[1]",
                    locateStrategy: 'xpath'
                },
                doctor: {
                    selector: "div[@class='patient-info-group-1']/div[2]",
                    locateStrategy: 'xpath'
                },
                birthday: {
                    selector: "div[@class='patient-info-group-2']/div[@class='column-1']/div[1]",
                    locateStrategy: 'xpath'
                },
                phone: {
                    selector: "div[@class='patient-info-group-2']/div[@class='column-1']/div[2]",
                    locateStrategy: 'xpath'
                },
                gender: {
                    selector: "div[@class='patient-info-group-2']/div[@class='column-2']/div[1]",
                    locateStrategy: 'xpath'
                },
                number: {
                    selector: "div[@class='patient-info-group-2']/div[@class='column-2']/div[2]",
                    locateStrategy: 'xpath'
                },
                address: {
                    selector: "div[contains(., 'Address')]",
                    locateStrategy: 'xpath'
                }
            }
        }
    },
    elements: {
        popUpButtonOk: ".modal-content .btn-success"
    }
};