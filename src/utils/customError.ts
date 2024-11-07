class CustomError extends Error {
    statusCode: number;
    status: string;
    isOperational: boolean;

    constructor(message: string, statusCode: number) {
        super(message);
        
        // Set the status code and other properties
        this.statusCode = statusCode;
        this.status = statusCode >= 400 && statusCode < 500 ? "Fail" : "Error";
        this.isOperational = true;

        // Ensures that the stack trace is captured
        Error.captureStackTrace(this, this.constructor);
    }
}

export default CustomError;
