import { handler } from './hello';

describe('Lambda handler', () => {
    beforeAll(() => {
        const mockDate = new Date('2025-08-09T10:11:12Z');
        jest.useFakeTimers().setSystemTime(mockDate);
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    for (const testCase of [
        {
            name: 'should greet with first and last name',
            params: { first_name: 'John', last_name: 'Doe' },
            want: 'Hello John Doe, time is 10:11:12 (UTC)',
        },
        {
            name: 'should greet with only first name',
            params: { first_name: 'Alice' },
            want: 'Hello Alice, time is 10:11:12 (UTC)',
        },
        {
            name: 'should greet with only last name',
            params: { last_name: 'Bob' },
            want: 'Hello Bob, time is 10:11:12 (UTC)',
        },
        {
            name: 'should greet guest if no name provided',
            params: {},
            want: 'Hello Guest, time is 10:11:12 (UTC)',
        },
    ]) {
        it(testCase.name, async () => {
            const event = {
                queryStringParameters: testCase.params,
            };
            const result = await handler(event);
            expect(result.statusCode).toBe(200);
            expect(result.body).toBe(testCase.want);
        });
    }
});
