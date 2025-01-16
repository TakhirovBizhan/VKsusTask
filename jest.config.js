/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "./tsconfig.jest.json" }], 
  },
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy", 
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"], 
};
