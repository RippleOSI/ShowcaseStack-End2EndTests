var patientSummaryCommands = {
    handlePopUp: function () {
        try {
            this.waitForElementVisible('@popUpButtonOk', this.api.globals.wait_milliseconds);
            this.click('@popUpButtonOk');
            this.waitForElementNotPresent('@popUpButtonOk', this.api.globals.wait_milliseconds);
        } catch (ex) {
            console.log("The notification pop-up didn't (dis)appear");
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
        },
        patientSummary: {
            selector: ".section-main",
            elements: {
                title: ".panel-heading .panel-title",
                filterButton: ".panel-heading .btn-dropdown-toggle"
            },
            sections: {
                filterMenu: {
                    selector: ".panel-heading .dropdown-menu",
                    elements: {
                        problemsCheckbox: "#dashboard-problems",
                        problemsCheckboxLabel: {
                            selector: "div//label[@for='dashboard-problems']",
                            locateStrategy: 'xpath'
                        },
                        contactsCheckbox: "#dashboard-contacts",
                        contactsCheckboxLabel: {
                            selector: "div//label[@for='dashboard-contacts']",
                            locateStrategy: 'xpath'
                        },
                        allergiesCheckbox: "#dashboard-allergies",
                        allergiesCheckboxLabel: {
                            selector: "div//label[@for='dashboard-allergies']",
                            locateStrategy: 'xpath'
                        },
                        medicationsCheckbox: "#dashboard-medications",
                        medicationsCheckboxLabel: {
                            selector: "div//label[@for='dashboard-medications']",
                            locateStrategy: 'xpath'
                        }
                    }
                },
                problemsBoard: {
                    selector: "patients-summary-component//div[contains(@class,'dashboard-item')][contains(., 'Problems')]",
                    locateStrategy: 'xpath',
                    elements: {
                        header: "h3"
                    }
                },
                contactsBoard: {
                    selector: "patients-summary-component//div[contains(@class,'dashboard-item')][contains(., 'Contacts')]",
                    locateStrategy: 'xpath',
                    elements: {
                        header: "h3"
                    }
                },
                allergiesBoard: {
                    selector: "patients-summary-component//div[contains(@class,'dashboard-item')][contains(., 'Allergies')]",
                    locateStrategy: 'xpath',
                    elements: {
                        header: "h3"
                    }
                },
                medicationsBoard: {
                    selector: "patients-summary-component//div[contains(@class,'dashboard-item')][contains(., 'Medications')]",
                    locateStrategy: 'xpath',
                    elements: {
                        header: "h3"
                    }
                }
            }
        }
    },
    elements: {
        popUpButtonOk: ".modal-content .btn-success"
    }
};