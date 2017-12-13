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
