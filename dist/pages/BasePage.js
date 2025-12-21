"use strict";
/// <reference types="cypress" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePage = void 0;
exports.resolveElementName = resolveElementName;
function resolveElementName(explicit, caller, fallback) {
    return explicit || caller || fallback;
}
class BasePage {
    el(selector, name) {
        cy.log(`🔹 ${resolveElementName(name, this.extractCallerName(), selector)}`);
        return cy.get(selector);
    }
    elContains(text, name) {
        cy.log(`🔹 ${resolveElementName(name, this.extractCallerName(), text)}`);
        return cy.contains(text);
    }
    extractCallerName() {
        var _a, _b;
        const stack = new Error().stack;
        if (!stack)
            return null;
        return ((_b = (_a = stack.split('\n')[3]) === null || _a === void 0 ? void 0 : _a.match(/get (\w+)/)) === null || _b === void 0 ? void 0 : _b[1]) || null;
    }
}
exports.BasePage = BasePage;
