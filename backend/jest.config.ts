import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from './tsconfig.json';

const config: Config = {
  testEnvironment: 'node',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
  preset: 'ts-jest',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  // Resolver path aliases
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  // Global setup
  globalSetup: './__tests__/helpers/globalSetup.ts',
  globalTeardown: './__tests__/helpers/globalTeardown.ts',
  setupFiles: ['dotenv/config'],
  verbose: true,
  // Coverage
  coveragePathIgnorePatterns: ['node_modules/', 'dist/', 'src/config/', 'src/docs/', 'src/types/'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  // Reporter
  reporters: ['default', ['jest-ctrf-json-reporter', {}]],
  clearMocks: true,
};

export default config;
