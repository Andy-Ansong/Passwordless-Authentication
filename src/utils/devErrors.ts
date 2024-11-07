import { Response } from 'express'; // Importing Response type from express

interface ErrorResponse {
    statusCode: number;
    message: string;
    stack?: string;
    error: any;
}

export const devErrors = (res: Response, error: ErrorResponse): Response => {
    return res.status(error.statusCode).send({
        status: error.statusCode,
        message: error.message,
        stackTrace: error.stack,
        error: error
    });
}
