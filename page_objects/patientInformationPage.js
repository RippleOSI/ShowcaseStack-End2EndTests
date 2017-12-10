module.exports = {
    url: function () {
        return this.api.launchUrl + '/#/profile';
    },
    elements: {
        header: '.header-title'
    },
    sections: {
        preferences: {
            selector: '//div[contains(@class, "panel-secondary")][1]',
            locateStrategy: 'xpath',
            elements: {
                title: 'h3'
            }
        },
        personalInfo: {
            selector: '//div[contains(@class, "panel-secondary")][2]',
            locateStrategy: 'xpath',
            elements: {
                title: 'h3'
            }
        },
        contacts: {
            selector: '//div[contains(@class, "panel-secondary")][3]',
            locateStrategy: 'xpath',
            elements: {
                title: 'h3'
            }
        },
        changeHistory: {
            selector: '//div[contains(@class, "panel-secondary")][4]',
            locateStrategy: 'xpath',
            elements: {
                title: 'h3'
            }
        }
    }
};