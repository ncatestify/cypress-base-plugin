import { isInternal } from '../utils/isInternal';
import { expect } from '@jest/globals';
global.Cypress = {
    config: jest.fn().mockReturnValue('http://localhost:3000')
};
describe('isInternal', () => {
    test('returns true for internal URLs', () => {
        expect(isInternal('/path/to/page')).toBe(true);
    });
    test('returns false for external URLs', () => {
        expect(isInternal('https://www.example.com')).toBe(false);
    });
    test('returns true for wildcard protocol matching baseUrl', () => {
        expect(isInternal('//localhost:3000/path/to/page')).toBe(true);
    });
});
