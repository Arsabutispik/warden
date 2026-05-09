import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        // Tell ESLint to ignore our build output and generated SQL files
        ignores: ['dist/', 'drizzle/', 'node_modules/'],
        rules: {
            // You can customize rules here. These two are great starting points:
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/no-explicit-any': 'warn',
        },
    }
);