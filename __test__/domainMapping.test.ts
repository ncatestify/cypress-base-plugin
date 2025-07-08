import { describe, it, expect } from 'vitest'
import { autoDetectDomainMapping, applyDomainMapping, shouldIncludeUrl } from '../src/utils/domainMapping'

describe('domainMapping', () => {
  describe('autoDetectDomainMapping', () => {
    const testCases = [
      {
        name: 'should detect nevercodealone staging pattern',
        input: 'https://testingcrud.testify.projects.nevercodealone.de',
        expected: { 'nevercodealone.de': 'testingcrud.testify.projects.nevercodealone.de' }
      },
      {
        name: 'should detect common staging patterns',
        input: 'https://staging.example.com',
        expected: { 'example.com': 'staging.example.com' }
      },
      {
        name: 'should detect test subdomain patterns',
        input: 'https://test.mysite.org',
        expected: { 'mysite.org': 'test.mysite.org' }
      },
      {
        name: 'should return empty for production URLs',
        input: 'https://example.com',
        expected: {}
      }
    ]

    testCases.forEach(({ name, input, expected }) => {
      it(name, () => {
        const result = autoDetectDomainMapping(input)
        expect(result).toEqual(expected)
      })
    })
  })

  describe('applyDomainMapping', () => {
    const testCases = [
      {
        name: 'should apply manual domain mapping',
        url: 'https://example.com/page',
        config: { mappings: { 'example.com': 'staging.example.com' }, autoDetectFromBaseUrl: false },
        baseUrl: 'https://staging.example.com',
        expected: 'https://staging.example.com/page'
      },
      {
        name: 'should apply auto-detected mapping',
        url: 'https://nevercodealone.de/page',
        config: { autoDetectFromBaseUrl: true },
        baseUrl: 'https://testingcrud.testify.projects.nevercodealone.de',
        expected: 'https://testingcrud.testify.projects.nevercodealone.de/page'
      },
      {
        name: 'should not modify URLs that do not match mappings',
        url: 'https://other.com/page',
        config: { mappings: { 'example.com': 'staging.example.com' } },
        baseUrl: 'https://staging.example.com',
        expected: 'https://other.com/page'
      },
      {
        name: 'should prioritize manual mappings over auto-detection',
        url: 'https://example.com/page',
        config: { mappings: { 'example.com': 'custom.example.com' }, autoDetectFromBaseUrl: true },
        baseUrl: 'https://staging.example.com',
        expected: 'https://custom.example.com/page'
      }
    ]

    testCases.forEach(({ name, url, config, baseUrl, expected }) => {
      it(name, () => {
        const result = applyDomainMapping(url, config, baseUrl)
        expect(result).toBe(expected)
      })
    })
  })

  describe('shouldIncludeUrl', () => {
    it('should include internal URLs', () => {
      const config = {}
      const result = shouldIncludeUrl('/internal-page', config, 'https://example.com')
      expect(result).toBe(true)
    })

    it('should include URLs from includedDomains', () => {
      const config = {
        includedDomains: ['api.example.com']
      }
      const result = shouldIncludeUrl('https://api.example.com/endpoint', config, 'https://example.com')
      expect(result).toBe(true)
    })

    it('should include URLs from manual mappings', () => {
      const config = {
        mappings: { 'production.com': 'staging.production.com' }
      }
      const result = shouldIncludeUrl('https://production.com/page', config, 'https://staging.production.com')
      expect(result).toBe(true)
    })

    it('should include URLs from auto-detected mappings', () => {
      const config = {
        autoDetectFromBaseUrl: true
      }
      const result = shouldIncludeUrl('https://nevercodealone.de/page', config, 'https://testingcrud.testify.projects.nevercodealone.de')
      expect(result).toBe(true)
    })

    it('should exclude unrelated external URLs', () => {
      const config = {}
      const result = shouldIncludeUrl('https://external.com/page', config, 'https://example.com')
      expect(result).toBe(false)
    })
  })
})