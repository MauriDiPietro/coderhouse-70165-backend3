export class NotFoundError extends Error {
    constructor(message){
        super(message);
        this.name = 'Not Found'
    }
}

export class CustomError extends Error {
    constructor(message, statusCode){
        super(message);
        this.status = statusCode;
        // this.name = name
    }
}

export const ERRORS_DICTIONARY = {
    USER_EXISTS : "User already exists",
    USER_NOT_FOUND: "User not found",
}