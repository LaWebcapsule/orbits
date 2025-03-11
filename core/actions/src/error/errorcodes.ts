export enum errorCodes {
    OTHER = -1,
    DATABASE_ERROR = 0,
    /**
     * @deprecated use RESOURCE_NOT_FOUND
     */
    RESSOURCE_NOT_FOUND = 1,
    RESOURCE_NOT_FOUND = 1,
    /**
     * @deprecated use NOT_ACCEPTABLE
     */
    Not_ACCEPTABLE = 2,
    NOT_ACCEPTABLE = 2,
    UNAUTHORIZED = 3,
    INVALID_SESSION = 4,
    /**
     * @deprecated use RESOURCE_LOCKED
     */
    RESSOURCE_LOCKED = 5,
    RESOURCE_LOCKED = 5,
    /**
     * @deprecated use RESOURCE_ALREADY_EXISTS
     */
    RESSOURCE_ALREADY_EXISTS = 6,
    RESOURCE_ALREADY_EXISTS = 6,
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
