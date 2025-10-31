export enum errorCodes {
    OTHER = -1,
    DATABASE_ERROR = 0,
    AGENT_NOT_FOUND = 1,
    NOT_ACCEPTABLE = 2,
    UNAUTHORIZED = 3,
    INVALID_SESSION = 4,
    AGENT_LOCKED = 5,
    AGENT_ALREADY_EXISTS = 6,
    TIMEOUT = 7,
    /**
     * 400 - 599 reserved for API return (proxy)
     */
    REQUEST_ERROR = 400,
    REQUEST_ERROR1 = 401,
    REQUEST_ERROR2 = 402,
    REQUEST_FORBIDDEN = 403,
    REQUEST_NOT_FOUND = 404,
}
