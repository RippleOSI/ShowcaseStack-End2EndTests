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
                        header: "h3",
                        redirectButton: ".btn-board-more"
                    }
                },
                contactsBoard: {
                    selector: "div//div[contains(@class,'dashboard-item')][contains(., 'Contacts')]",
                    locateStrategy: 'xpath',
                    elements: {
                        header: "h3",
                        redirectButton: ".btn-board-more"
                    }
                },
                allergiesBoard: {
                    selector: "div//div[contains(@class,'dashboard-item')][contains(., 'Allergies')]",
                    locateStrategy: 'xpath',
                    elements: {
                        header: "h3",
                        redirectButton: ".btn-board-more"
                    }
                },
                medicationsBoard: {
                    selector: "div//div[contains(@class,'dashboard-item')][contains(., 'Medications')]",
                    locateStrategy: 'xpath',
                    elements: {
                        header: "h3",
                        redirectButton: ".btn-board-more"
                    }
                }
            }
        },
        allergies: {
            selector: ".panel-primary",
            elements: {
                title: ".panel-heading .panel-title"
            }
        },
        problems: {
            selector: ".panel-primary",
            elements: {
                title: ".panel-heading .panel-title"
            }
        },
        contacts: {
            selector: ".panel-primary",
            elements: {
                title: ".panel-heading .panel-title"
            }
        },
        medication: {
            selector: ".panel-primary",
            elements: {
                title: ".panel-heading .panel-title"
            }
        },
        breadcrumbs: {
            selector: ".breadcrumbs",
            elements: {
                patientSummary: {
                    selector: "*/a[.,'Patient Summary']",
                    locateStrategy: 'xpath'
                }
            }
        },
        leftBarMenu: {
            selector: ".sidebar-nav-list",
            elements: {
                patientSummary: {
                    selector: "li/a[.='Patient Summary']",
                    locateStrategy: 'xpath'
                },
                problems: {
                    selector: "li/a[.='Problems / Diagnosis']",
                    locateStrategy: 'xpath'
                },
                medications: {
                    selector: "li/a[.='Medications']",
                    locateStrategy: 'xpath'
                },
                allergies: {
                    selector: "li/a[.='Allergies']",
                    locateStrategy: 'xpath'
                },
                contacts: {
                    selector: "li/a[.='Contacts']",
                    locateStrategy: 'xpath'
                },
                clinicalNotes: {
                    selector: "li/a[.='Clinical Notes']",
                    locateStrategy: 'xpath'
                },
                personalNotes: {
                    selector: "li/a[.='Personal Notes']",
                    locateStrategy: 'xpath'
                },
                vaccinations: {
                    selector: "li/a[.='Vaccinations']",
                    locateStrategy: 'xpath'
                },
                testResults: {
                    selector: "li/a[.='Test Results']",
                    locateStrategy: 'xpath'
                },
                procedures: {
                    selector: "li/a[.='Procedures']",
                    locateStrategy: 'xpath'
                },
                events: {
                    selector: "li/a[.='Events']",
                    locateStrategy: 'xpath'
                },
                referrals: {
                    selector: "li/a[.='Referrals']",
                    locateStrategy: 'xpath'
                },
                mdt: {
                    selector: "li/a[.='MDT']",
                    locateStrategy: 'xpath'
                },
                orders: {
                    selector: "li/a[.='Orders']",
                    locateStrategy: 'xpath'
                }
            }
        }
    },
    elements: {
        popUpButtonOk: ".modal-content .btn-success"
    }
};