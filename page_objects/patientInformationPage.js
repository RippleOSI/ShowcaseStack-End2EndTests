module.exports = {
    url: function () {
        return this.api.launchUrl + '#/profile';
    },
    elements: {
        header: '.header-title'
    },
    sections: {
        preferences: {
            selector: '//div[contains(@class, "panel-secondary")][1]',
            locateStrategy: 'xpath',
            elements: {
                title: 'h3',
                expandButton: 'button.btn-toggle-rotate'
            }
        },
        personalInfo: {
            selector: '//div[contains(@class, "panel-secondary")][2]',
            locateStrategy: 'xpath',
            elements: {
                title: 'h3',
                expandButton: 'button.btn-toggle-rotate'
            },
            sections: {
                content: {
                    selector: '.panel-body',
                    elements: {
                        firstNameLabel: {
                            selector: 'div//div[@class="form-group"][1]/label',
                            locateStrategy: 'xpath'
                        },
                        firstNameValue: {
                            selector: 'div//div[@class="form-group"][1]/div',
                            locateStrategy: 'xpath'
                        },
                        lastNameLabel: {
                            selector: 'div//div[@class="form-group"][2]/label',
                            locateStrategy: 'xpath'
                        },
                        lastNameValue: {
                            selector: 'div//div[@class="form-group"][2]/div',
                            locateStrategy: 'xpath'
                        },
                        nhsNoLabel: {
                            selector: 'div//div[@class="form-group"][3]/label',
                            locateStrategy: 'xpath'
                        },
                        nhsNoValue: {
                            selector: 'div//div[@class="form-group"][3]/div',
                            locateStrategy: 'xpath'
                        },
                        birthdayLabel: {
                            selector: 'div//div[contains(@class, "col-xs-12")][2]//div[@class="form-group"][1]/label',
                            locateStrategy: 'xpath'
                        },
                        birthdayValue: {
                            selector: 'div//div[contains(@class, "col-xs-12")][2]//div[@class="form-group"][1]/div',
                            locateStrategy: 'xpath'
                        },
                        genderLabel: {
                            selector: 'div//div[contains(@class, "col-xs-12")][2]//div[@class="form-group"][2]/label',
                            locateStrategy: 'xpath'
                        },
                        genderValue: {
                            selector: 'div//div[contains(@class, "col-xs-12")][2]//div[@class="form-group"][2]/div',
                            locateStrategy: 'xpath'
                        },
                        doctorLabel: {
                            selector: 'div//div[contains(@class, "col-xs-12")][2]//div[@class="form-group"][3]/label',
                            locateStrategy: 'xpath'
                        },
                        doctorValue: {
                            selector: 'div//div[contains(@class, "col-xs-12")][2]//div[@class="form-group"][3]/div',
                            locateStrategy: 'xpath'
                        }
                    }
                }
            }
        },
        contacts: {
            selector: '//div[contains(@class, "panel-secondary")][3]',
            locateStrategy: 'xpath',
            elements: {
                title: 'h3',
                expandButton: 'button.btn-toggle-rotate'
            }
        },
        changeHistory: {
            selector: '//div[contains(@class, "panel-secondary")][4]',
            locateStrategy: 'xpath',
            elements: {
                title: 'h3',
                expandButton: 'button.btn-toggle-rotate'
            }
        }
    }
};