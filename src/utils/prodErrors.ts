import { Response } from 'express'; // Importing Response type from express

interface CustomError extends Error {
    isOperational: boolean;
    statusCode: number;
    message: string;
}

export const prodErrors = (res: Response, error: CustomError): Response => {
    if (error.isOperational) {
        return res.status(error.statusCode).send({
            status: error.statusCode,
            message: error.message,
        });
    } else {
        return res.status(500).send({
            status: "Error",
            message: "Something went wrong, please try again.",
        });
    }
}
