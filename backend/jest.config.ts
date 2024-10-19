import type { Config } from 'jest';

import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const config: Config = {
  testEnvironment: 'node',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
  preset: 'ts-jest',
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  globalSetup: './__tests__/helpers/globalSetup.ts',
  globalTeardown: './__tests__/helpers/globalTeardown.ts',
  verbose: true,
  coveragePathIgnorePatterns: ['node_modules/', 'dist/', 'src/config/', 'src/docs/', 'src/types/'],
  setupFiles: ['dotenv/config'],
};

export default config;
