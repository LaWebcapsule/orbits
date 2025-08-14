import js from '@eslint/js';
import { Action, ActionState, Workflow } from '@orbi-ts/core';
import { ESLint } from 'eslint';
import fs from 'fs';
import jest from 'jest';
import path from 'path';
import prettier from 'prettier';
import stripAnsi from 'strip-ansi';
import tseslint from 'typescript-eslint';

export class FormatCodeAction extends Action {
    declare IArgument: Action['IArgument'] & {
        codePath: string;
    };

    async main() {
        const code = fs.readFileSync(this.argument.codePath, 'utf-8');
        try {
            const prettierConfig: prettier.Options = {
                trailingComma: 'es5',
                tabWidth: 4,
                useTabs: false,
                semi: true,
                singleQuote: true,
                filepath: this.argument.codePath,
            };
            const formatted = await prettier.format(code, prettierConfig);
            if (code === formatted) {
                this.internalLog('No need to format');
                return ActionState.SUCCESS;
            }
            fs.writeFileSync(this.argument.codePath, formatted, 'utf-8');
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
    declare IArgument: Action['IArgument'] & {
        codePath: string;
    };

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
        const results = await eslint.lintFiles([this.argument.codePath]);
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
    declare IArgument: Action['IArgument'] & {
        codePath: string;
    };

    async main() {
        const writeStdout = process.stdout.write;
        const writeStderr = process.stderr.write;

        try {
            const dirname = path.dirname(this.argument.codePath);
            const filename = path
                .basename(this.argument.codePath)
                .split('.')[0];

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
    declare IArgument: Action['IArgument'] & {
        codePath: string;
    };

    async define() {
        const steps = [
            { name: 'format', action: FormatCodeAction },
            { name: 'lint', action: LintCodeAction },
            { name: 'test', action: TestCodeAction },
        ];

        for (const step of steps) {
            await this.do(
                step.name,
                new step.action().setArgument({
                    codePath: this.argument.codePath,
                })
            );
        }
    }
}
