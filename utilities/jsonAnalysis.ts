import {FrisbySpec, Joi} from "frisby";
import * as data from "../data/base-data.json";

export async function analyseJson(spec: FrisbySpec, json: JSON, expectPath: string = '') {
    let attrName;
    let attrValue;
    for (let key in json){
        if (json.hasOwnProperty(key)){
            attrName = key;
            //@ts-ignore
            attrValue = json[key];

            // IF FINAL VALUE (NOT ARRAY OR JSON)
            if (attrValue.constructor.name === 'String' && typeof attrValue === 'string' ||
                attrValue.constructor.name === 'Boolean' && typeof attrValue === 'boolean' ||
                attrValue.constructor.name === 'Number' && typeof attrValue === 'number'){
                    if (data.print) console.log(attrName + ' is a ' + attrValue.constructor.name + '!');
                    await buildAndExecuteExpectation(spec, attrValue, expectPath + (expectPath.length === 0 ? attrName : '.' + attrName));
            }
            // IF JSON VALUE
            else if (attrValue.constructor.name === 'Object' && typeof attrValue === 'object'){
                if (data.print) console.log(attrName + ' is an Object!');
                await analyseJson(spec, attrValue, // RECURSION INTO LOWER JSON
                 expectPath + (expectPath.length === 0 ? attrName : '.' + attrName));
            }
            // IF ARRAY VALUE
            else if (attrValue.constructor.name === 'Array' && typeof attrValue === 'object'){
                if (data.print) console.log(attrName + ' is an Array!');
                for (let item of attrValue){
                    await analyseJson(spec, attrValue, // RECURSION INTO LOWER JSON
                        expectPath + (expectPath.length === 0 ? attrName + '.*' : '.' + attrName + '.*'));
                }
            }
        }
    }
}

async function buildAndExecuteExpectation(spec: FrisbySpec, attrValue: string | number | boolean, expectPath: string) {
    switch (typeof attrValue){
        case 'string': {
            if(attrValue === 'string'){
                if (data.print) console.log('string type assertion');
                return new Promise((resolve, reject) => {
                    spec.expect('jsonTypes', expectPath, Joi.string().required())
                        .then(() => resolve(), (e) => reject(e))});
            } else if(attrValue === 'number') {
                if (data.print) console.log('number type assertion');
                return new Promise((resolve, reject) => {
                    spec.expect('jsonTypes', expectPath, Joi.number().required())
                        .then(() => resolve(), (e) => reject(e))});
            } else if(attrValue === 'boolean') {
                if (data.print) console.log('boolean type assertion');
                return new Promise((resolve, reject) => {
                    spec.expect('jsonTypes', expectPath, Joi.boolean().required())
                        .then(() => resolve(), (e) => reject(e))});
            } else if(attrValue === 'date') {
                if (data.print) console.log('date type assertion');
                return new Promise((resolve, reject) => {
                    spec.expect('jsonTypes', expectPath, Joi.date().required())
                        .then(() => resolve(), (e) => reject(e))});
            } else if(attrValue.startsWith('REGEX:')) {
                if (data.print) console.log('REGEX type assertion');
                return new Promise((resolve, reject) => {
                    spec.expect('json', expectPath, new RegExp(attrValue.substring(6)))
                        .then(() => resolve(), (e) => reject(e))});
            } else {
                if (data.print) console.log('value assertion');
                return new Promise((resolve, reject) => {
                    spec.expect('json', expectPath, attrValue)
                        .then(() => resolve(), (e) => reject(e))});
            }
        }
        case 'number': {
            if (data.print) console.log('number value assertion');
            return new Promise((resolve, reject) => {
                spec.expect('json', expectPath, attrValue)
                    .then(() => resolve(), (e) => reject(e))});
        }
        case 'boolean': {
            if (data.print) console.log('boolean value assertion');
            return new Promise((resolve, reject) => {
                spec.expect('json', expectPath, attrValue)
                    .then(() => resolve(), (e) => reject(e))});
        }
        default: {
            return new Promise((resolve => resolve()))
        }
    }
}
