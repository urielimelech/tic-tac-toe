"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    constructor() { }
    log(str) {
        const time = new Date().toJSON();
        console.log(`${time} - ${str}`);
    }
}
exports.Logger = Logger;
