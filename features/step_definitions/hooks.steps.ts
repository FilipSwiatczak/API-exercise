import {After, Before, BeforeAll, setDefaultTimeout, World} from "cucumber";
import {explicitTimeout} from "../../data/timeouts";
import * as frisby from "frisby";
import {FrisbySpec} from "frisby";
import State from "../../State";

let world: World;

BeforeAll({timeout: explicitTimeout.halfMinute}, async function() {
    setDefaultTimeout(explicitTimeout.fifteenSec);
    frisby.globalSetup({
        request: {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            timeout: 15000
        }
    });
});

Before({timeout: explicitTimeout.halfMinute}, async function(scenario) {
    console.log('_____________________________________________________\n\n Scenario START: ' + scenario.pickle.name);
});

After({timeout: explicitTimeout.halfMinute}, async function(scenario) {
    world = this;
    // @ts-ignore
    const rsp = State.getResponse()._response;
    State.getResponse().use(inspectRequestHeaders)
        .use(inspectResponseStatus)
        .use(inspectResponseHeaders)
        .use(inspectResponseBody);
});

function inspectRequestHeaders(rsp: FrisbySpec) {
    return rsp.then(() => {
       // @ts-ignore
       world.attach('&#13;&#10;REQUEST:' + rsp._request.url);
       world.attach('&#13;&#10;REQUEST HEADERS:');
       // @ts-ignore
       let headers = rsp._request.headers.raw();

       for (let key in headers){
           world.attach(`\t${key}: ${headers[key]}`);
       }
    });
}
function inspectResponseStatus(rsp: FrisbySpec){
    return rsp.then(() => {
        // @ts-ignore
        world.attach('&#13;&#10;STATUS:' + rsp._response.status);
    })
}
function inspectResponseHeaders(rsp: FrisbySpec) {
    return rsp.then(() => {
        world.attach('&#13;&#10;RESPONSE HEADERS:');
        // @ts-ignore
        let headers = rsp._response.headers.raw();

        for (let key in headers){
            world.attach(`\t${key}: ${headers[key]}`);
        }
    });
}
function inspectResponseBody(rsp: FrisbySpec) {
    return rsp.then(() => {
        world.attach('&#13;&#10;RESPONSE BODY:');
        // @ts-ignore
        if(rsp._response !== undefined
            // @ts-ignore
            && rsp._response.json !== undefined) {
            // @ts-ignore
                world.attach(JSON.stringify(rsp._response.json, null, 4)
                    .replace(/\n/g, '&#13;&#10;')
                    .replace(/\t/g, '&#13;&#10;'));
        } else {
            world.attach('Response body was empty')
        }
    });
}