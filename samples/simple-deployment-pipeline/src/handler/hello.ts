type HelloEvent = {
    queryStringParameters: {
        first_name?: string;
        last_name?: string;
    };
};

export const handler = async (
    event: HelloEvent
): Promise<{
    statusCode: number;
    body: string;
}> => {
    const firstName = event.queryStringParameters.first_name;
    const lastName = event.queryStringParameters.last_name;
    const now = new Date();
    return {
        statusCode: 200,
        body:
            `Hello ${[firstName, lastName].filter(Boolean).join(' ') || 'Guest'}, ` +
            `time is ${now.getUTCHours()}:${now.getUTCMinutes()}:${now.getUTCSeconds()} (UTC)`,
    };
};
