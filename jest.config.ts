import nextJest from "next/jest.js";
import type { Config } from "jest";

const createJestConfig = nextJest({ dir: "./" });

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
 moduleNameMapper: {
  '^next/link$': '<rootDir>/tests/__mocks__/next-link.tsx',
  '^next/image$': '<rootDir>/tests/__mocks__/next-image.tsx',
  '^next/font/(.*)$': '<rootDir>/tests/__mocks__/next-font.ts',
  '^next/navigation$': '<rootDir>/tests/__mocks__/next-navigation.ts',
  '^framer-motion$': '<rootDir>/tests/__mocks__/framer-motion.tsx',
  '^lucide-react$': '<rootDir>/tests/__mocks__/lucide-react.ts',
  '^@/(.*)$': '<rootDir>/$1',
  '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
},
  moduleDirectories: ["node_modules", "<rootDir>/"],
  transformIgnorePatterns: ["node_modules/(?!(lucide-react|@radix-ui)/)"],
  collectCoverageFrom: [
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "lib/**/*.{ts,tsx}",
    "!app/**/*.d.ts",
  ],
};

export default createJestConfig(config);
