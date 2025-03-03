module.exports = {
  preset: 'ts-jest',
  rootDir: './src', // src 디렉토리를 기준으로 설정
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: [
    '**/?(*.)+(spec|test).[jt]s?(x)', // .spec.ts 또는 .test.ts 파일 포함
  ],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'], // 무시할 경로
  collectCoverage: true,
  coverageDirectory: '../coverage', // coverage 결과 저장 위치
  coverageReporters: ['text'],
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/*.d.ts'], // 커버리지 수집 대상
};
