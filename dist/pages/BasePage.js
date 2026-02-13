"use strict";
/// <reference types="cypress" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePage = void 0;
class BasePage {
    el(selector, name) {
        const logName = name || this.extractGetterName() || selector;
        cy.log(logName);
        return cy.get(selector);
    }
    extractGetterName() {
        var _a, _b;
        const stack = new Error().stack;
        if (!stack)
            return null;
        return ((_b = (_a = stack.split('\n')[3]) === null || _a === void 0 ? void 0 : _a.match(/get (\w+)/)) === null || _b === void 0 ? void 0 : _b[1]) || null;
    }
}
exports.BasePage = BasePage;
