var HtmlReporter = require('nightwatch-html-reporter');
var reporter = new HtmlReporter({
    openBrowser: true,
    reportsDirectory: __dirname + '/reports',
    hideSuccess: false
});

const testPatientPath = "/api/patients/9999999000/";

function printStatus(response) {
    console.log("Got response for deleting stuff: " + response.statusCode);
}

function sendDeleteCall (host, path) {
    var http = require('http');

    function initCallBack(response) {
        console.log("Got response for init: " + response.statusCode);

        response.on("data", function (chunk) {
            var text = "" + chunk;
            var token = text.split(",")[0].split(":")[1].replace(/[{"]/g, "");
            console.log("Auth token: " + token);

            var options = {
                host: host,
                path: testPatientPath + path,
                headers: {
                    Authorization: token
                },
                method: 'DELETE'
            };
            console.log('Deleting: ' + options.host + options.path);
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
}

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

            var host = String(partsOfUrl[2]).replace("secure", "");
            console.log("host: " + host);

            var deletePath = tab + "/" + String(String(partsOfUrl[partsOfUrl.length - 1]).split("?")[0]);
            console.log("path :" + deletePath);

            browser.globals.sendDeleteCall(host, deletePath);
        });
    },

    deleteTestItems: function (browser, tab, nameField, nameValue) {
        browser.url(function (result) {
            // return the current url
            console.log(result.value);

            var partsOfUrl = result.value.split("/");

            var host = String(partsOfUrl[2]).replace("secure", "");
            console.log("host: " + host);

            browser.globals.deleteAllMatchingName(host, tab, nameField, nameValue);
        });
    },

    deleteAllMatchingName: function (host, tab, nameField, nameValue) {
        var http = require('http');

        function parseItemsList(response) {
            // console.log(response);
            var whole = "";
            response.on("data", function (chunk) {
                whole += "" + chunk;
            });

            response.on("end", function () {
                var items = JSON.parse(whole);
                // console.log(items);
                for (var index = 0; index < items.length; index++) {
                    var itemName = items[index][nameField];
                    // console.log(itemName);
                    if (String(itemName).indexOf(nameValue) === 0) {
                        console.log("Deleting " + tab + " " + itemName);
                        sendDeleteCall(host, tab + "/" + items[index].sourceId);
                    }
                }
            });
        }

        function sendGetCall(response) {
            console.log("Got response for init: " + response.statusCode);

            response.on("data", function (chunk) {
                var text = "" + chunk;
                var token = text.split(",")[0].split(":")[1].replace(/[{"]/g, "");
                console.log("Auth token: " + token);
                var options = {
                    host: host,
                    path: testPatientPath + tab,
                    headers: {
                        Authorization: token
                    },
                    method: 'GET'
                };
                console.log(options.path);
                var req = http.request(options, parseItemsList);
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

        http.get(options, sendGetCall);
    },

    sendDeleteCall: function (host, path) {
        sendDeleteCall(host, path);
    },

    pickDate: function (browser, dateString) {
        var dateFormat = require('dateformat');
        var monthAndYear = dateFormat(dateString, "mmmm yyyy");
        var day = dateFormat(dateString, "dd");

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
                datePicker.getText('@currentMonth', function (result) {
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