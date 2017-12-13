var HtmlReporter = require('nightwatch-html-reporter');
var reporter = new HtmlReporter({
    openBrowser: true,
    reportsDirectory: __dirname + '/reports',
    themeName: 'cover'
});

module.exports = {
    reporter: reporter.fn,

    /**
     * Switches to specific version of app. To work properly, the env has to have following properties:
     *  version_switch_host
     *  version_switch_path
     *  version_switch_init_path
     * If those are missing, the switch won't work. Env is the part of nightwatch.json test_settings object
     *
     * @param browser
     * @param done
     */
    beforeEach: function (browser, done) {
        if (browser.globals.version_switch_host !== "") {
            console.log("Switching to " + browser.globals.version_switch_path);

            var http = require('http');

            function printStatus(response) {
                console.log("Got response for version switch: " + response.statusCode);
            }

            function initCallBack(response) {
                console.log("Got response for init: " + response.statusCode);

                response.on("data", function (chunk) {
                    var text = "" + chunk;
                    var token = text.split(",")[0].split(":")[1].replace(/[{"]/g, "");
                    console.log("Auth token: " + token);
                    var options = {
                        host: browser.globals.version_switch_host,
                        path: browser.globals.version_switch_path,
                        headers: {
                            Authorization: token
                        }
                    };
                    http.get(options, printStatus);
                });
            }

            var options = {
                host: browser.globals.version_switch_host,
                path: browser.globals.version_switch_init_path
            };

            http.get(options, initCallBack);
        } else {
            console.log("No version switch, if that is not expected, check nightwatch.json for preferences.")
        }
        console.log("Starting");
        done();
    }
};