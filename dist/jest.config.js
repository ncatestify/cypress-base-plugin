"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    testEnvironment: 'node',
    testMatch: ['**/__test__/**/*.test.ts'],
    transform: {
        '^.+\\.ts?$': 'ts-jest'
    },
    moduleFileExtensions: ['ts', 'js', 'json']
};
