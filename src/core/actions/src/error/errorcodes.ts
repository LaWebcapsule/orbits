export enum errorCodes{
    OTHER = -1,
    DATABASE_ERROR = 0,
    RESSOURCE_NOT_FOUND = 1,
    Not_ACCEPTABLE = 2,
    UNAUTHORIZED = 3,
    INVALID_SESSION = 4,
    RESSOURCE_LOCKED = 5,
    RESSOURCE_ALREADY_EXISTS = 6,
    TIMEOUT = 7,
    /**
     * creneau de 400 à 599 reserve au retour d'api. (proxy)
     */
    REQUEST_ERROR=400,
    REQUEST_ERROR1 = 401,
    REQUEST_ERROR2 = 402,
    REQUEST_FORBIDDEN = 403,
    REQUEST_NOT_FOUND = 404
}