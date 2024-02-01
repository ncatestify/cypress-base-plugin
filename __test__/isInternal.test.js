"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isInternal_1 = require("../src/utils/isInternal");
const globals_1 = require("@jest/globals");
describe('isInternal', () => {
    beforeEach(() => {
        process.env.BASE_URL = 'http://localhost:3000';
    });
    test('returns true for internal URLs', () => {
        (0, globals_1.expect)((0, isInternal_1.isInternal)('/path/to/page')).toBe(true);
    });
    test('returns true for wildcard protocol matching baseUrl', () => {
        (0, globals_1.expect)((0, isInternal_1.isInternal)('http://localhost:3000/path/to/page')).toBe(true);
    });
    test('returns true for wildcard protocol matching baseUrl', () => {
        (0, globals_1.expect)((0, isInternal_1.isInternal)('//localhost:3000/path/to/page')).toBe(true);
    });
    test('returns false for external URLs', () => {
        (0, globals_1.expect)((0, isInternal_1.isInternal)('https://www.example.com')).toBe(false);
    });
    test('returns false for wildcard protocol not matching baseUrl', () => {
        (0, globals_1.expect)((0, isInternal_1.isInternal)('//www.instagram.com/profile')).toBe(false);
    });
    afterEach(() => {
        delete process.env.BASE_URL;
    });
});
