export class NotFoundError extends Error {
    constructor(message){
        super(message);
        this.name = 'Not Found'
    }
}

export class CustomError extends Error {
    constructor(message, statusCode, name){
        super(message);
        this.status = statusCode;
        this.name = name
    }
}