# PulseTiles-Tests
repo for PulseTile End to End tests

# Instruction
* Install JDK http://www.oracle.com/technetwork/java/javase/downloads/index.html
* Install node.js and npm https://www.npmjs.com/get-npm?utm_source=house&utm_medium=homepage&utm_campaign=free%20orgs&utm_term=Install%20npm
* Install nightwatch http://nightwatchjs.org/gettingstarted#installation
* Download selenium standalone server http://selenium-release.storage.googleapis.com/index.html (latest is ok)
* Download chrome driver https://sites.google.com/a/chromium.org/chromedriver/downloads
* Set path to selenium-standalone-server.jar and chromedriver.exe in nightwatch.json selenium > server_path
* Set path to chromedriver.exe in nightwatch.json selenium > cli_args > webdriver.chrome.driver
* Run tests from parent catalog command line with command 'nightwatch'
