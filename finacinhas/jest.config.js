/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'node', // Ideal para testes do Firebase no servidor
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@renderer/(.*)$': '<rootDir>/src/renderer/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // Configuração global pós-setup
  transform: {
    '^.+\\.tsx?$': 'ts-jest' // Transforma arquivos TypeScript
  },
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'], // Encontra testes em qualquer pasta __tests__ ou com .test/.spec
  testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignora arquivos compilados e dependências
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // Extensões reconhecidas
  collectCoverage: true, // Gera relatório de cobertura
  coverageDirectory: '<rootDir>/coverage', // Pasta do relatório
  verbose: true, // Exibe detalhes dos testes
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './reports', // Caminho para os relatórios
        filename: 'report.html',
        expand: true // Expande as seções no relatório
      }
    ]
  ]
}

module.exports = config
