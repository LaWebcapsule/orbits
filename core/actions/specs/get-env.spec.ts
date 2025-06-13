import { getEnv } from '../src/runtime/get-env.js';

describe('get env', () => {
    it('should return correct value', () => {
        process.env = {};
        process.env.ORBITS_DB__MONGO__OPTS__TLS = 'false';
        process.env.NON_EXISTING_VAR = 'nonExistingVar';

        const workersOpts = {
            quantity: 1,
            filter: {
                myFilterValue: 'test',
            },
        };

        process.env.ORBITS_WORKERS = JSON.stringify(workersOpts);

        expect(getEnv()).toEqual({
            name: 'orbits-runtime',
            autostart: true,
            db: {
                mongo: {
                    url: 'mongodb://localhost:27017/orbits',
                    opts: {
                        tls: false,
                    },
                },
            },
            workers: workersOpts,
        });
    });
});
