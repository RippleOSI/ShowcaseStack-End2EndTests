var HtmlReporter = require('nightwatch-html-reporter');
var reporter = new HtmlReporter({
    openBrowser: true,
    reportsDirectory: __dirname + '/reports',
    hideSuccess: false
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
        console.log("Testing on URL: " + browser.launchUrl);

        if (browser.globals.version_switch_host !== undefined) {
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
    },

    afterEach: function (browser, done) {
        browser.end();
        done();
    },

    deleteCurrentItem: function (browser, tab) {
        browser.url(function (result) {
            // return the current url
            console.log(result.value);

            var partsOfUrl = result.value.split("/");

            var deletePath = tab + "/" + String(String(partsOfUrl[partsOfUrl.length - 1]).split("?")[0]);
            console.log(deletePath);

            browser.globals.sendDeleteCall(deletePath);
        });
    },

    sendDeleteCall: function (id) {
        var http = require('http');

        var host = "dev.ripple.foundation";

        function printStatus(response) {
            console.log("Got response for deleting stuff: " + response.statusCode);
        }

        function initCallBack(response) {
            console.log("Got response for init: " + response.statusCode);

            response.on("data", function (chunk) {
                var text = "" + chunk;
                var token = text.split(",")[0].split(":")[1].replace(/[{"]/g, "");
                console.log("Auth token: " + token);
                var options = {
                    host: host,
                    path: "/api/patients/9999999000/" + id,
                    headers: {
                        Authorization: token
                    },
                    method: 'DELETE'
                };
                console.log(options.path);
                var req = http.request(options, printStatus);
                req.on("error", function (e) {
                    console.log("ERROR: " + e.message);
                });

                req.end();
            });
        }

        var options = {
            host: host,
            path: "/api/initialise"
        };

        http.get(options, initCallBack);
    },

    pickDate: function (browser, dateString) {
        var dateFormat = require('dateformat');
        console.log(dateString);
        var monthAndYear = dateFormat(dateString, "mmmm yyyy");
        var day = dateFormat(dateString, "dd");
        console.log(monthAndYear);
        console.log(day);

        var datePicker = browser.page.reactDatePicker();
        var daySelector = '//div[contains(@class, "react-datepicker__day")][.="' + day + '"]';
        if (browser.globals.version_switch_path === undefined || browser.globals.version_switch_path.indexOf('ang') !== -1) {
            datePicker = browser.page.angularDatePicker();
            daySelector = '//button[contains(@class,"btn-sm")][.="' + day + '"]';
        }

        var keepGoing = true;
        var button = "@buttonBack";
        if (new Date(dateString) > new Date()) {
            button = "@buttonForward";
        }

        function spinMonths(index) {
            if (index < 20) {
                console.log(index);

                datePicker.getText('@currentMonth', function (result) {
                    console.log(result);
                    if (result.value === monthAndYear) {
                        browser.useXpath().click(daySelector);
                    } else {
                        datePicker.click(button);
                        spinMonths(index + 1);
                    }
                })
            }
        }

        spinMonths(0);
    }
};