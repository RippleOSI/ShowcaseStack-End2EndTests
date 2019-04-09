var loginCommands = {
    login: function () {
        this.api.url(this.api.launchUrl);
        this.api.windowMaximize('current');

        var loginButton = this.api.globals.settings.loginButton;

        this.waitForElementVisible(this.api.globals.settings.userLoginInput, this.api.globals.wait_milliseconds)
            .setValue(this.api.globals.settings.userLoginInput, this.api.globals.settings.userLogin)
            .setValue(this.api.globals.settings.userPasswordInput, this.api.globals.settings.userPassword)
            .click(loginButton);

        if (this.api.globals.settings.hasTermsAndConditions) {
            var agreeButton = this.api.globals.settings.agreeButton;
            this.waitForElementVisible(agreeButton, this.api.globals.wait_milliseconds_short)
                .click(agreeButton)
                .waitForElementNotPresent(agreeButton, this.api.globals.wait_milliseconds);
        }
    }
};

module.exports = {
    commands: [loginCommands],
    elements: {}
};

