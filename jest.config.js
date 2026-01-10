const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/components/**/*.{js,jsx,ts,tsx}',
    '!src/components/**/*.d.ts',
    '!src/components/**/index.{js,ts}',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  transformIgnorePatterns: [
    // Transform ESM modules from libraries: react-markdown, rehype-raw, remark-gfm, etc.
    'node_modules/(?!(react-markdown|rehype-raw|remark-gfm|vfile|unist-.*|hast-.*|mdast-.*|micromark.*|decode-named-character-reference|character-entities|property-information|space-separated-tokens|comma-separated-tokens|bail|trough|unified|is-plain-obj|trim-lines)/)',
  ],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
