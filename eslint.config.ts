import { defineConfig } from 'eslint/config'
// @ts-expect-error Type definitions missing
import nextVitals from 'eslint-config-next/core-web-vitals'
// @ts-expect-error Type definitions missing
import nextTs from 'eslint-config-next/typescript'
import importAlias from '@limegrass/eslint-plugin-import-alias'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import tsmEslintReact from '@navikt/tsm-eslint-react'

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    ...tsmEslintReact,
    {
        extends: [eslintPluginPrettierRecommended],
        rules: { 'prettier/prettier': 'warn' },
    },
    {
        files: ['src/**/*.ts', 'src/**/*.tsx'],
        plugins: { 'import-alias': importAlias },
        rules: { 'import-alias/import-alias': 'error' },
    },
])

export default eslintConfig
