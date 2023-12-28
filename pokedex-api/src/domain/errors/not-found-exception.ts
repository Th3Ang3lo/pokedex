export class NotFoundException extends Error {
    constructor(message = 'Not Found') {
        super(message);
    }
}