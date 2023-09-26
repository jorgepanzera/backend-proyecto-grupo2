// jest.config.ts
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  // Jest configuration options go here
  // For example:
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./jest.setup.ts'],
};

export default config;
