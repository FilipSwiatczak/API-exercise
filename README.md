### Weather Checker API testing exercise

This project tests the sample Weather Checker API

Install with `npm i`

Run `npm run test` to run the test pack

Run `npm run report` to generate report after the run

Results report is generated under temporary folder `.tmp/report/htmlReport/index.html`

#### About the solution:
 - Results should all be passing, for negative tests error messages are set to what the API returned during tests
 - **Frisby.js** a powerful, clean API testing framework, implemented in typescript. [Official docs](https://docs.frisbyjs.com/)
 - **Cucumber framework** wrapping Frisby calls with Cucumber steps to allow user friendly test writing, code reusability and pretty reports
 - **Swagger style response assertion** combining Frisby's fluent response body navigation, Joi's fluent assertion on those response elements, I've automated logic that consumes a copy-pasted swagger doc (contract response) and automatically compares and validates response against it [here](./utilities/jsonAnalysis.ts). As result you can copy paste expected json responses, with values set to actual strings, numbers or dates, or alternatively choose type assertion by entering string|number|date|boolean|REGEX like in the second test [in feature](./features/weather-checker.feature)
 - utilises **Cucumber reporter** by _Wim Selles_ [multiple-cucumber-html-reporter](https://www.npmjs.com/package/multiple-cucumber-html-reporter) configured [here](src/lib/multipleCucumberReporter.js)

#### Troubleshooting:
 **Non-windows disclosure**: efforts have been made to ensure pathing is system agnostic and all dependencies have no system specific issues. That said it has not been tested on a Mac/Linux

![alt text](https://cdn-images-1.medium.com/max/249/1*y_euvEopwrhPAT2meoPTkg@2x.png)