# README #

### Lingotek Bridge UI ###

* Quick summary: This allows Lingotek users to quickly and easily send up content to our TMS system from various websites.
* Version

### How do I get set up? ###

* Summary of set up

This is chrome/firefox web extension. It is coupled with Lingotek's Middleware software. Here are the steps in order to set up development.      
            
    1. clone the git repository
    2. run 'npm install' and 'bower install' to get the needed dependencies
    3. Set up your middleware with ngrok by following these instructions: https://docs.google.com/document/d/1gMwlKK3Du-BhhPxCSXoEKe--KUP9bhpJpDgFeX31KtA/edit#heading=h.zght61xuxvpp
    4. Once ngrok is up and running, copy the Forwarding https address from the terminal (example: 'https://c96e449d.ngrok.io'). Paste it into your config.dev.json file found in popup in the place provided for mwHost. 
    5. We typically test this in google chrome. To load the extension into Chrome, go to chrome://extensions/ and you can load it in two ways. You can either drag the spark folder from your filesystem into the browser or use the load unpacked extension button to select the folder.
    6. Once the extension is loaded you need to log in. Click the extension icon and it will bring a up a large connect button. Click this and it will open a new window with connector settings. If for some reason your ngrok is not working you will get an error saying that the ngrok tunnel is not found. If it works then click login with sandbox account and then login to your lingotek account.
    7. You are now ready to use the extension with compatible websites

* Configuration
* Dependencies: Angular ^1.5.2, Angular Material 
* Database configuration
* How to run tests

  Tests are written using Jasmine and are run with Karma. The karma.conf.js file dictates how tests are run. A code coverage report is generated in the coverage   folder. To look at it simply pull up the html file.

Use these commands to run tests:

    1. Use 'gulp test' to run a single test with karma
    2. Use 'gulp test-dev' to run tests and watch files. The tests will rerun when you save a file
    3. Use 'karma start' to run the tests and watch files as well.

* Deployment instructions
  Run gulp publish in order to condense and minify js and scss files. It will produce a zipme file. This file will be zipped and then uploaded onto the Chrome store. We publish this connector under several different names since it integrates with various websites. Josh Solomon has a script which prepares these individual extensions for push to production, so once you have the zipme folder, send it to him unzipped. He will publish the updates to the Chrome store.

### Contribution guidelines ###

* Writing tests
  
    * Title test files as .spec.js


* Code review
  
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
  Direct questions towards Matt Smith
* Other community or team contact
  If you have issues with Ngrok and setting up middleware then Edward Richards should be able to help you