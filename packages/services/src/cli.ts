import { spawn, SpawnOptionsWithoutStdio } from 'child_process';
import { Writable } from 'stream';

export class Cli {
    command(
        command: string,
        args: string[],
        options: SpawnOptionsWithoutStdio & {
            stderr?: Writable;
            stdout?: Writable;
        } = {}
    ) {
        return new Promise<void>((resolve, reject) => {
            const childProcess = spawn(command, args, { ...options });
            let error: Error;
            childProcess.on('error', (err) => {
                error = new Error();
                error.message = String(err);
            });
            childProcess.stderr.pipe(options.stderr || process.stderr);
            childProcess.stdout.pipe(options.stdout || process.stdout);

            childProcess.on('close', (code) => {
                if (error) {
                    reject(error);
                } else if (code === 0) {
                    resolve();
                } else {
                    error = new Error();
                    error.message = `Process ${command} exited with code ${code}`;
                    reject(error);
                }
            });
        });
    }
}
