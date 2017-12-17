var patientSummaryCommands = {
    handlePopUp: function () {
        if (this.api.globals.version_switch_path === undefined || this.api.globals.version_switch_path.indexOf('ang') !== -1) {
            try {
                this.waitForElementVisible('@popUpButtonOk', this.api.globals.wait_milliseconds);
                this.click('@popUpButtonOk');
                this.waitForElementNotPresent('@popUpButtonOk', this.api.globals.wait_milliseconds);
            } catch (ex) {
                console.log("The notification pop-up didn't (dis)appear");
                console.log(ex);
            }
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
            selector: ".panel-primary",
            elements: {
                title: ".panel-heading .panel-title",
                filterButton: ".panel-heading .btn-dropdown-toggle"
            },
            sections: {
                filterMenu: {
                    selector: ".panel-heading .dropdown-menu",
                    elements: {
                        problemsCheckboxLabel: {
                            selector: "div//label[contains(@for,'problems')]",
                            locateStrategy: 'xpath'
                        },
                        contactsCheckboxLabel: {
                            selector: "div//label[contains(@for,'contacts')]",
                            locateStrategy: 'xpath'
                        },
                        allergiesCheckboxLabel: {
                            selector: "div//label[contains(@for,'allergies')]",
                            locateStrategy: 'xpath'
                        },
                        medicationsCheckboxLabel: {
                            selector: "div//label[contains(@for,'medications')]",
                            locateStrategy: 'xpath'
                        }
                    }
                },
                problemsBoard: {
                    selector: "div//div[contains(@class,'dashboard-item')][contains(., 'Problems')]",
                    locateStrategy: 'xpath',
                    elements: {
                        header: "h3"
                    }
                },
                contactsBoard: {
                    selector: "div//div[contains(@class,'dashboard-item')][contains(., 'Contacts')]",
                    locateStrategy: 'xpath',
                    elements: {
                        header: "h3"
                    }
                },
                allergiesBoard: {
                    selector: "div//div[contains(@class,'dashboard-item')][contains(., 'Allergies')]",
                    locateStrategy: 'xpath',
                    elements: {
                        header: "h3"
                    }
                },
                medicationsBoard: {
                    selector: "div//div[contains(@class,'dashboard-item')][contains(., 'Medications')]",
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