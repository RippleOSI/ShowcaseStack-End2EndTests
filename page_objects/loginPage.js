var loginCommands = {
    login: function () {
        return this.waitForElementVisible('@loginInput', this.globals.wait_milliseconds)
            .setValue('@loginInput', 'Alen')
            .setValue('@passwordInput', '070790')
            .click('@loginButton')
            .waitForElementNotPresent('@loginButton', this.globals.wait_milliseconds);
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

