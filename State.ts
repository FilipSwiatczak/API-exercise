import {FrisbySpec} from "frisby";

class StateS {
    version: string = '';
    response: FrisbySpec = new FrisbySpec();
    headerMap: object = {};

    getResponse() {
        return this.response;
    }

    setResponse(rsp: FrisbySpec) {
        this.response = rsp;
    }
}
const State = new StateS();
export default State;