var patientSummaryCommands = {
    handlePopUp: function () {
        if (this.api.globals.version_switch_path === undefined || this.api.globals.version_switch_path.indexOf('ang') !== -1) {
            try {
                this.waitForElementVisible('@popUpButtonOk', this.api.globals.wait_milliseconds);
                this.api.pause(this.api.globals.wait_milliseconds);
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
                title: ".panel-heading .panel-title",
                createButton: ".btn-create",
                filterButton: ".btn-filter",
                filterInput: ".panel-filter .form-control",
                table: "table"
            },
            sections: {
                table: {
                    selector: "table"
                }
            }
        },
        createAllergyForm: {
            selector: ".panel-secondary",
            elements: {
                title: ".panel-title",
                completeButton: ".panel-control .btn-success",
                causeInput: "#cause",
                reactionInput: "#reaction",
                terminologyInput: "#causeTerminology",
                editButton: ".btn-edit",
                expandButton: '.btn-toggle-rotate',
                causeLabel: {
                    selector: "(div//div[contains(@class,'form-control-static')])[1]",
                    locateStrategy: 'xpath'
                },
                reactionLabel: {
                    selector: "(div//div[contains(@class,'form-control-static')])[2]",
                    locateStrategy: 'xpath'
                }
            }
        },
        problems: {
            selector: ".panel-primary",
            elements: {
                title: ".panel-heading .panel-title",
                createButton: ".btn-create",
                filterButton: ".btn-filter",
                filterInput: ".panel-filter .form-control",
                table: "table"
            }
        },
        createProblemForm: {
            selector: ".panel-secondary",
            elements: {
                title: ".panel-title",
                completeButton: ".panel-control .btn-success",
                problemInput: "#problem",
                calendar: "input[name~='dateOfOnset']",
                descriptionInput: "#description",
                descriptionEditInput: "#text",
                terminologyInput: "#terminology",
                editButton: ".btn-edit",
                problemLabel: {
                    selector: "(div//div[contains(@class,'form-control-static')])[1]",
                    locateStrategy: 'xpath'
                },
                dateLabel: {
                    selector: "(div//div[contains(@class,'form-control-static')])[2]",
                    locateStrategy: 'xpath'
                },
                descriptionLabel: {
                    selector: "(div//div[contains(@class,'form-control-static')])[3]",
                    locateStrategy: 'xpath'
                },
                terminologyLabel: {
                    selector: "(div//div[contains(@class,'form-control-static')])[4]",
                    locateStrategy: 'xpath'
                }
            }
        },
        contacts: {
            selector: ".panel-primary",
            elements: {
                title: ".panel-heading .panel-title",
                createButton: ".btn-create",
                filterButton: ".btn-filter",
                filterInput: ".panel-filter .form-control",
                table: "table"
            },
            sections: {
                table: {
                    selector: "table"
                }
            }
        },
        createContactForm: {
            selector: ".panel-secondary",
            elements: {
                title: ".panel-title",
                completeButton: ".panel-control .btn-success",
                nameInput: "#name",
                relationshipSelect: "#relationship",
                nextOfKinCheckbox: "label[for='nextOfKin']",
                relationshipTypeSelect: "#relationshipCode",
                infoInput: "#contactInformation",
                noteInput: "#notes",
                editButton: ".btn-edit",
                expandButton: '.btn-toggle-rotate',
                nameLabel: {
                    selector: "(div//div[contains(@class,'form-control-static')])[1]",
                    locateStrategy: 'xpath'
                },
                relationshipLabel: {
                    selector: "(div//div[contains(@class,'form-control-static')])[2]",
                    locateStrategy: 'xpath'
                },
                relationshipTypeLabel: {
                    selector: "(div//div[contains(@class,'form-control-static')])[3]",
                    locateStrategy: 'xpath'
                },
                infoLabel: {
                    selector: "(div//div[contains(@class,'form-control-static')])[4]",
                    locateStrategy: 'xpath'
                },
                nextOfKinLabel: {
                    selector: "(div//div[contains(@class,'form-control-static')])[5]",
                    locateStrategy: 'xpath'
                },
                noteLabel: {
                    selector: "(div//div[contains(@class,'form-control-static')])[6]",
                    locateStrategy: 'xpath'
                },
                authorLabel: {
                    selector: "(div//div[contains(@class,'form-control-static')])[7]",
                    locateStrategy: 'xpath'
                },
                dateLabel: {
                    selector: "(div//div[contains(@class,'form-control-static')])[8]",
                    locateStrategy: 'xpath'
                },
                sourceLabel: {
                    selector: "(div//div[contains(@class,'form-control-static')])[9]",
                    locateStrategy: 'xpath'
                }
            }
        },
        medication: {
            selector: ".panel-primary",
            elements: {
                title: ".panel-heading .panel-title",
                createButton: ".btn-create",
                filterButton: ".btn-filter",
                filterInput: ".panel-filter .form-control"
            },
            sections: {
                table: {
                    selector: "table"
                }
            }
        },
        createMedicationForm: {
            selector: ".panel-secondary",
            elements: {
                title: ".panel-title",
                completeButton: ".panel-control .btn-success",
                nameInput: "#name",
                doseInput: "#doseAmount",
                doseVarCheckBox: "#doseAmountVariable",
                doseTimingInput: "#doseTiming",
                doseDirectionsInput: "#doseDirections",
                routeSelect: "#route",
                editButton: ".btn-edit",
                expandButton: '.btn-toggle-rotate',
                nameLabel: {
                    selector: "(div//div[contains(@class,'form-control-static')])[1]",
                    locateStrategy: 'xpath'
                },
                doseLabel: {
                    selector: "(div//div[contains(@class,'form-control-static')])[2]",
                    locateStrategy: 'xpath'
                },
                timingLabel: {
                    selector: "(div//div[contains(@class,'form-control-static')])[3]",
                    locateStrategy: 'xpath'
                },
                directionsLabel: {
                    selector: "(div//div[contains(@class,'form-control-static')])[4]",
                    locateStrategy: 'xpath'
                }
            }
        },
        personalNotes: {
            selector: ".panel-primary",
            elements: {
                title: ".panel-heading .panel-title",
                createButton: ".btn-create",
                filterButton: ".btn-filter",
                filterInput: ".panel-filter .form-control",
                table: "table"
            },
            sections: {
                table: {
                    selector: "table"
                }
            }
        },
        createPersonalNoteForm: {
            selector: ".panel-secondary",
            elements: {
                title: ".panel-title",
                completeButton: ".panel-control .btn-success",
                typeInput: "#noteType",
                noteInput: "#notes",
                editButton: ".btn-edit",
                expandButton: '.btn-toggle-rotate',
                typeLabel: {
                    selector: "(div//div[contains(@class,'form-control-static')])[1]",
                    locateStrategy: 'xpath'
                },
                noteLabel: {
                    selector: "(div//div[contains(@class,'form-control-static')])[2]",
                    locateStrategy: 'xpath'
                },
                dateLabel: {
                    selector: "(div//div[contains(@class,'form-control-static')])[4]",
                    locateStrategy: 'xpath'
                },
                sourceLabel: {
                    selector: "(div//div[contains(@class,'form-control-static')])[5]",
                    locateStrategy: 'xpath'
                }
            }
        },
        vaccinations: {
            selector: ".panel-primary",
            elements: {
                title: ".panel-heading .panel-title",
                createButton: ".btn-create",
                filterButton: ".btn-filter",
                filterInput: ".panel-filter .form-control"
            }
        },
        createVaccinationForm: {
            selector: ".panel-secondary",
            elements: {
                title: ".panel-title",
                completeButton: ".panel-control .btn-success",
                nameInput: "#vaccinationName",
                calendar: "#vaccinationDateTime",
                serialInput: "#series",
                commentInput: "#comment",
                editButton: ".btn-edit",
                nameLabel: {
                    selector: "(div//div[contains(@class,'form-control-static')])[1]",
                    locateStrategy: 'xpath'
                },
                dateLabel: {
                    selector: "(div//div[contains(@class,'form-control-static')])[2]",
                    locateStrategy: 'xpath'
                },
                serialLabel: {
                    selector: "(div//div[contains(@class,'form-control-static')])[3]",
                    locateStrategy: 'xpath'
                },
                commentLabel: {
                    selector: "(div//div[contains(@class,'form-control-static')])[5]",
                    locateStrategy: 'xpath'
                }
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
        secondaryPanel2: {
            selector: "//div[contains(@class, 'panel-secondary')][2]",
            locateStrategy: 'xpath',
            elements: {
                expandButton: '.btn-toggle-rotate',
                body: '.panel-body'
            }
        },
        secondaryPanel3: {
            selector: "//div[contains(@class, 'panel-secondary')][3]",
            locateStrategy: 'xpath',
            elements: {
                body: '.panel-body'
            }
        },
        secondaryPanel4: {
            selector: "//div[contains(@class, 'panel-secondary')][4]",
            locateStrategy: 'xpath',
            elements: {
                body: '.panel-body'
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
        leftBarMenuToggle: ".btn-toggle-sidebar",
        popUpButtonOk: ".modal-content .btn-success"
    }
};