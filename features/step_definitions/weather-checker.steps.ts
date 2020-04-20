import {Given, Then} from "cucumber";
import {explicitTimeout} from "../../data/timeouts";
import * as data from "../../data/base-data.json"
import * as frisby from "frisby";
import {analyseJson} from "../../utilities/jsonAnalysis";
import State from "../../State";

Given(/^response body matches structure below$/, async function (comment) {
   const json = JSON.parse(comment);
   await analyseJson(State.getResponse(), json);
});

Given(/^request is sent for "([^"]*)" postcode$/,  function (postcode) {
   State.setResponse(frisby.post(data.baseUrl, {address: postcode}));
});

Given(/^expect status (\d{3})$/,  function (responseCode) {
   return State.getResponse().expect('status', Number.parseInt(responseCode));
});