import { autoDetectDomainMapping, applyDomainMapping, shouldIncludeUrl } from '../src/utils/domainMapping'
import { expect } from '@jest/globals'

describe('domainMapping', () => {
  describe('autoDetectDomainMapping', () => {
    it('should detect nevercodealone staging pattern', () => {
      const result = autoDetectDomainMapping('https://testingcrud.testify.projects.nevercodealone.de')
      expect(result).toEqual({
        'nevercodealone.de': 'testingcrud.testify.projects.nevercodealone.de'
      })
    })

    it('should detect common staging patterns', () => {
      const result = autoDetectDomainMapping('https://staging.example.com')
      expect(result).toEqual({
        'example.com': 'staging.example.com'
      })
    })

    it('should detect test subdomain patterns', () => {
      const result = autoDetectDomainMapping('https://test.mysite.org')
      expect(result).toEqual({
        'mysite.org': 'test.mysite.org'
      })
    })

    it('should return empty for production URLs', () => {
      const result = autoDetectDomainMapping('https://example.com')
      expect(result).toEqual({})
    })
  })

  describe('applyDomainMapping', () => {
    it('should apply manual domain mapping', () => {
      const config = {
        mappings: { 'example.com': 'staging.example.com' },
        autoDetectFromBaseUrl: false
      }
      const result = applyDomainMapping('https://example.com/page', config, 'https://staging.example.com')
      expect(result).toBe('https://staging.example.com/page')
    })

    it('should apply auto-detected mapping', () => {
      const config = {
        autoDetectFromBaseUrl: true
      }
      const result = applyDomainMapping('https://nevercodealone.de/page', config, 'https://testingcrud.testify.projects.nevercodealone.de')
      expect(result).toBe('https://testingcrud.testify.projects.nevercodealone.de/page')
    })

    it('should not modify URLs that do not match mappings', () => {
      const config = {
        mappings: { 'example.com': 'staging.example.com' }
      }
      const result = applyDomainMapping('https://other.com/page', config, 'https://staging.example.com')
      expect(result).toBe('https://other.com/page')
    })

    it('should prioritize manual mappings over auto-detection', () => {
      const config = {
        mappings: { 'example.com': 'custom.example.com' },
        autoDetectFromBaseUrl: true
      }
      const result = applyDomainMapping('https://example.com/page', config, 'https://staging.example.com')
      expect(result).toBe('https://custom.example.com/page')
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