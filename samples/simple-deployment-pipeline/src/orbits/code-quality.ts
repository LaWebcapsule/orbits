import js from '@eslint/js';
import { ESLint } from 'eslint';
import fs from 'fs';
import jest from 'jest';
import path from 'path';
import prettier from 'prettier';
import stripAnsi from 'strip-ansi';
import tseslint from 'typescript-eslint';

import { Action, ActionState, Workflow } from '@orbi-ts/core';

import { CODE_PATH } from '../constants';

export class FormatCodeAction extends Action {
    async main() {
        const code = fs.readFileSync(CODE_PATH, 'utf-8');
        try {
            const prettierConfig: prettier.Options = {
                trailingComma: 'es5',
                tabWidth: 4,
                useTabs: false,
                semi: true,
                singleQuote: true,
                filepath: CODE_PATH,
            };
            const formatted = await prettier.format(code, prettierConfig);
            if (code === formatted) {
                this.internalLog('No need to format');
                return ActionState.SUCCESS;
            }
            fs.writeFileSync(CODE_PATH, formatted, 'utf-8');
            this.internalLog('Formatted!');
        } catch (error) {
            const msg = (error as Error).message;
            this.internalLog(msg, { level: 'error' });
            throw Error(stripAnsi(msg));
        }
        return ActionState.SUCCESS;
    }
}

export class LintCodeAction extends Action {
    async main() {
        const eslintOptions = {
            overrideConfigFile: true,
            overrideConfig: [
                {
                    ...js.configs.recommended,
                },
                ...tseslint.configs.recommended.map((config) => ({
                    ...config,
                })),
            ],
        };

        const eslint = new ESLint(eslintOptions as ESLint.Options);
        const results = await eslint.lintFiles([CODE_PATH]);
        const hasErrors = results.some((r) => r.errorCount > 0);

        if (hasErrors) {
            const formatter = await eslint.loadFormatter();
            const resultText = await formatter.format(results);
            this.internalLog(resultText, { level: 'error' });
            this.setResult({ results });
            return ActionState.ERROR;
        }
        return ActionState.SUCCESS;
    }
}

export class TestCodeAction extends Action {
    async main() {
        const writeStdout = process.stdout.write;
        const writeStderr = process.stderr.write;

        try {
            const dirname = path.dirname(CODE_PATH);
            const filename = path.basename(CODE_PATH).split('.')[0];

            const jestConfig = {
                runInBand: true,
                preset: 'ts-jest',
                testEnvironment: 'node',
                testPathPattern: [filename + '.spec.ts'],
                silent: true,
                json: true,
            };

            // silence output from jest
            process.stdout.write = () => true;
            process.stderr.write = () => true;
            const { results } = await jest.runCLI(jestConfig as any, [dirname]);
            if (!results.success) {
                this.internalLog(
                    results.testResults
                        .map((res) => res.failureMessage ?? '')
                        .join('\n'),
                    { level: 'error' }
                );
                this.setResult({ results });
                return ActionState.ERROR;
            }
            return ActionState.SUCCESS;
        } catch (error) {
            const msg = (error as Error).message;
            this.internalLog(msg, { level: 'error' });
            throw Error(stripAnsi(msg));
        } finally {
            process.stdout.write = writeStdout;
            process.stderr.write = writeStderr;
        }
    }
}

export class CodeQualityWorkflow extends Workflow {
    async define() {
        const steps = [
            { name: 'format', action: FormatCodeAction },
            { name: 'lint', action: LintCodeAction },
            { name: 'test', action: TestCodeAction },
        ];

        for (const step of steps) {
            await this.do(step.name, new step.action());
        }
    }
}
