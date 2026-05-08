import { defineConfig } from 'i18next-cli';

export default defineConfig({
    locales: ['en', 'tr'],
    extract: {
        input: 'src/**/*.{ts,tsx}',
        output: 'locales/{{language}}/translation.json',
        nsSeparator: false,
        keySeparator: false,
    },
});