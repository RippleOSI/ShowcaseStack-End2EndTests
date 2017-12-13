# PulseTiles-Tests
repo for PulseTile End to End tests

# Instruction
For Windows
* Install JDK http://www.oracle.com/technetwork/java/javase/downloads/index.html, latest will do
* Install node.js and npm https://www.npmjs.com/get-npm?utm_source=house&utm_medium=homepage&utm_campaign=free%20orgs&utm_term=Install%20npm (checked for node version 0.10.22 and npm version 1.3.14)
* Install nightwatch http://nightwatchjs.org/gettingstarted#installation (checked for version 0.9.16)
* Download selenium standalone server http://selenium-release.storage.googleapis.com/index.html (checked for version 3.8.0)
* Download chrome driver https://sites.google.com/a/chromium.org/chromedriver/downloads (checked for version 2.34)
* Set path to selenium-standalone-server.jar and chromedriver.exe in nightwatch.json selenium > server_path
* Set path to chromedriver.exe in nightwatch.json selenium > cli_args > webdriver.chrome.driver
* Run tests from parent catalog command line with command 'nightwatch'

# nightwatch.json
Is a config file. See for full details http://nightwatchjs.org/gettingstarted/#settings-file
The important part besides paths to chrome driver and selenium server is the ability to set several environments.
Environments contain information about your app url, selenium server url (which shouldn't be changed unless you are 
going to use remote servers like selenium grid or cloud solutions), whether to do screenshots and where to put those, etc.
Also the switch between versions of app (react/angular) is implemented with environments. There is a default env that
is pointing to https://secureshowcase.ripple.foundation/ with no version switch and dev_react and dev_angular 
each pointing to https://securedev.ripple.foundation/ with switching to corresponding version.
You can easily switch the env you want to run tests on by adding --env env_name to your nightwatch command, i.e. 
nightwatch --dev_react
Version switch is implemented with API calls, see globals.js. So if you want to add a new env with switching versions, 
make sure to set
* "version_switch_host": "dev.ripple.foundation", - host of API calls
* "version_switch_init_path": "/api/initialise", - to provide authorization
* "version_switch_path": "/api/ui/version_name" 
