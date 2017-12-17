var loginCommands = {
    login: function () {
        this.api.url(this.api.launchUrl);
        this.api.windowMaximize('current');
        this.waitForElementVisible('@loginInput', this.api.globals.wait_milliseconds)
            .setValue('@loginInput', 'Alen')
            .setValue('@passwordInput', '070790')
            .click('@loginButton')
            .waitForElementNotPresent('@loginButton', this.api.globals.wait_milliseconds);
    }
};

module.exports = {
    commands: [loginCommands],
    elements: {
        loginInput: "input[name^='username']",
        passwordInput: "input[name^='password']",
        loginButton: "button.auth0-lock-submit"
    }
};

