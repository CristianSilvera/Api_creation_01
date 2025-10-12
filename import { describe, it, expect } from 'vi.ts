import { describe, it, expect } from 'vitest'
import config from './vitest.comf'

// vitest.comf.test.ts

describe('vitest.comf.ts configuration', () => {
    it('exports a config object with expected coverage settings', () => {
        expect(config).toBeTypeOf('object')
        expect(config.test).toBeTypeOf('object')

        const coverage = config.test.coverage
        expect(coverage).toBeTypeOf('object')

        // basic flags
        expect(coverage.enabled).toBe(true)
        expect(coverage.provider).toBe('v8')
        expect(coverage.all).toBe(true)

        // reporters and patterns
        expect(coverage.reporter).toEqual(['text', 'text-summary', 'html'])
        expect(coverage.include).toEqual(['src/**/*.ts'])
        expect(coverage.exclude).toEqual(['**/*.test.ts', 'src/tests/**'])
    })
})