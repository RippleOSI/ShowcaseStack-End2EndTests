# RippleOSI-End2EndTests
repo for End to End tests for RippleOSI stack 
(history: derived from PulseTile test work)

# Instruction
For Windows
* Install Chrome https://www.google.com/chrome/browser/desktop/index.html
* Install JDK http://www.oracle.com/technetwork/java/javase/downloads/index.html, latest will do
* Install node.js and npm https://www.npmjs.com/get-npm?utm_source=house&utm_medium=homepage&utm_campaign=free%20orgs&utm_term=Install%20npm (checked for node version 0.10.22 and npm version 1.3.14)
* Install nightwatch http://nightwatchjs.org/gettingstarted#installation (checked for version 0.9.16)
* Download selenium standalone server http://selenium-release.storage.googleapis.com/index.html (checked for version 3.8.0)
* Download chrome driver https://sites.google.com/a/chromium.org/chromedriver/downloads (checked for version 2.34)
* Clone the repository to your machine
* Configure nightwatch.json file: 
	* Set path to selenium-standalone-server.jar and chromedriver.exe in nightwatch.json selenium > server_path
	* Set path to chromedriver.exe in nightwatch.json selenium > cli_args > webdriver.chrome.driver
* Run 'npm install' command from parent catalog to install the dependencies (nightwatch-html-reporter)
* Warning nightwatch-html-reporter (version 2.0.4) uses pug library which has a known issue that should be fixed manually: 
* Fix nightwatch-html-reporter
    * Open node_modules\nightwatch-html-reporter\node_modules\pug\node_modules\pug-code-gen\index.js
    * Scroll to line 813 'attributeBlocks(attributeBlocks) {'
    * Make it 'attributeBlocks:function(attributeBlocks) {'
    * Yes, that's dull, but there is a known issue and this is a workaround. Maybe later versions of reporter would use later version of pug and this step would be redundant.
* Run tests from parent catalog command line with command 'nightwatch'
* When the tests are finished, the report will be displayed in your browser
* You can find screenshots of failed tests in reports\screenshots

For macOS: 
* Install Chrome https://www.google.com/chrome/browser/desktop/index.html
* Install JDK http://www.oracle.com/technetwork/java/javase/downloads/index.html, latest will do
* Install node.js and npm https://www.npmjs.com/get-npm?utm_source=house&utm_medium=homepage&utm_campaign=free%20orgs&utm_term=Install%20npm (checked for node version 8.9.3 and npm version 5.6.0 )
* Install nightwatch http://nightwatchjs.org/gettingstarted#installation (checked for version 0.9.16)
* Download selenium standalone server http://selenium-release.storage.googleapis.com/index.html (latest is ok)
Or 
brew install selenium-server-standalone
selenium-server -port 4444
(I use selenium-standalone v.3.8.1)
* Download chrome driver https://sites.google.com/a/chromium.org/chromedriver/downloads
* Clone the repository to your machine
* Configure nightwatch.json file:  
	* Set path to selenium-standalone-server.jar in "server-path":  (i.e. "server_path" : "/usr/local/Cellar/selenium-server-standalone/3.8.1/libexec/selenium-server-standalone-3.8.1.jar")
	* Set path to chromedriver in cli_args > 'webdriver.chrome.driver' (i.e. "webdriver.chrome.driver" : "/Users/{user}/pulse_tile/chromedriver" )
* Run 'npm install' command from parent catalog to install the dependencies (nightwatch-html-reporter)
* Warning nightwatch-html-reporter (version 2.0.4) uses pug library which has a known issue that should be fixed manually:
* Fix nightwatch-html-reporter
    * Open node_modules\nightwatch-html-reporter\node_modules\pug\node_modules\pug-code-gen\index.js
    * Scroll to line 813 'attributeBlocks(attributeBlocks) {'
    * Make it 'attributeBlocks:function(attributeBlocks) {'
    * Yes, that's dull, but there is a known issue and this is a workaround. Maybe later versions of reporter would use later version of pug and this step would be redundant.
* Run tests from parent catalog command line with command:
 'nightwatch'

 
# nightwatch.json
Is a config file. See for full details http://nightwatchjs.org/gettingstarted/#settings-file
The important part besides paths to chrome driver and selenium server is the ability to set several environments.
Environments contain information about your app url, selenium server url (which shouldn't be changed unless you are 
going to use remote servers like selenium grid or cloud solutions), whether to do screenshots and where to put those, etc.
Also the switch between versions of app (react/angular) is implemented with environments. There is a default env that
is pointing to https://secureshowcase.ripple.foundation/ with no version switch and dev_react and dev_angular 
each pointing to https://securedev.ripple.foundation/ with switching to corresponding version.
You can easily switch the env you want to run tests on by adding --env env_name to your nightwatch command, i.e. 

1) Angular (dev box):
nightwatch --env=dev_ang
2) React (dev box):
nightwatch --env=dev_react
3) Showcase box:
nightwatch
or
nightwatch --env=showcase

Version switch is implemented with API calls, see globals.js. So if you want to add a new env with switching versions, 
make sure to set
* "version_switch_host": "dev.ripple.foundation", - host of API calls
* "version_switch_init_path": "/api/initialise", - to provide authorization
* "version_switch_path": "/api/ui/version_name" 

# Test Data Deletion Tool
* From parent catalog cd utils
* See there are devDeleteList.json and showcaseDeleteList.json files which contain lists of test data items to be deleted correspondingly for dev or showcase
* Run 'node deleteItems.js devDeleteList.json' to delete test data items specified in devDeleteList.json 
* Run 'node deleteItems.js showcaseDeleteList.json' to delete test data items specified in showcaseDeleteList.json
* If you don't specify the .json file, devDeleteList.json would be used by default
* Note that if you run script from parent catalog it would be 'node util\deleteItems.js util\devDeleteList.json'
* Note that script execution might take some time depending on server and data base response time

# Jenkins
* Go to http://138.68.171.243:8080
* Log in with your account
* In the center of the screen you see the table of the jobs. There are such jobs:
	* Showcase Nightwatch Tests
	* Dev React Nightwatch Tests
	* Dev Angular Nightwatch Tests
* Each job pulls code from Github, runs Nightwath tests and sends reports. 
* You can run the job by clicking on run button in the very right
* Also jobs are run by cron timer:
	* Showcase Nightwatch Tests is run Mon-Fri at 12 AM London time
	* Dev React Nightwatch Tests is run on Thu at 12:30 AM London time
	* Dev Angular Nightwatch Tests is run on Thu at 1 AM London time
* After job is done, it will send out a email with test results.
	* Test reort and build log are attached to the email
	* Email is sent from gmail acc jenkins.ripple@gmail.com pass: ripple.foundation
* Jobs are set to wait for each other to finish, so no parallel runs could happen.
* You can see job details by clicking on its name
* You can browse working derictory of the job by going to job's details and clicking Working Derictory in the menu on the left. In working derictory there is pulled source code and reports, screenshots of the latest build
* You can edit jobs settings by going to job's details and clicking Settings in the left meny. 
	* You can change job's schedule in Triggers section. Cron notation is used, https://crontab.guru
	* You can edit job's email recepient list in Post-build section > Editable Email Notifications > Project Recepient List
	* Don't change things unless you know what you are doing
* You can change Jenkins settings by going to Jenkins home page and clicking Manage Jenkins in the left menu
	* You can create users by going to Manage Jenkins menu, scrolling to the bottom and selecting Manage Users, further is intuitive
	* You can change mail setting by going to Manage Jenkins menu > Configuration, scrolling to the bottom and editing Extended Email Notification settings
* When in doubt - click on a ? icon, it's often placed near changible things
* Last, but not least. Each jenkins job copies /home/rippletest/nightwatch.json to it's workspace. This is required to preserve path relative to jenkins machine. So if you change something in nightwatch.js file in code you should ssh to jenkins machine and do the changes in mentioned file too.
