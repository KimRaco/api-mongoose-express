class CustomError extends Error {
    status;
    constructor(message, status) {
        super(message);
        this.status = status || 400;  
    }
}

export { CustomError }