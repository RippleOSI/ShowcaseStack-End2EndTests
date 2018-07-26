var loginCommands = {
    login: function () {
        this.api.url(this.api.launchUrl);
        this.api.windowMaximize('current');

        var loginButton = this.api.globals.settings.loginButton;

        this.waitForElementVisible('@loginInput', this.api.globals.wait_milliseconds)
            .setValue('@loginInput', this.api.globals.settings.loginInput)
            .setValue('@passwordInput', this.api.globals.settings.passwordInput)
            .click(loginButton)
            .waitForElementNotPresent(loginButton, this.api.globals.wait_milliseconds);
    }
};

module.exports = {
    commands: [loginCommands],
    elements: {
        loginInput: "input[name^='username']",
        passwordInput: "input[name^='password']",
    }
};

