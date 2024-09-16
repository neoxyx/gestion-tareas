// jest.setup.ts
import '@testing-library/jest-dom';

module.exports = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    // otras configuraciones de Jest
};