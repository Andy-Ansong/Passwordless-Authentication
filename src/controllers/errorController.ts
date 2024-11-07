import { Request, Response, NextFunction } from 'express';

const castErrorHandler = (err: any) => {
    const msg = `Invalid value for ${err.path}: ${err.value}`;
    return { message: msg, statusCode: 400 };
};

const duplicateKeyErrorHandler = (err: any) => {
    const name = err.keyValue.name;
    const msg = `There is already a user with email ${name}`;
    return { message: msg, statusCode: 409 };
};

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'There was an error connecting to server';

    if (process.env.NODE_ENV === 'development') {
        // Development error handling (includes stack trace)
        res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
            stack: err.stack,
        });
    } else if (process.env.NODE_ENV === 'production') {
        if (err.name === 'CastError') {
            err = castErrorHandler(err);
        }
        if (err.code === 11000) {
            err = duplicateKeyErrorHandler(err);
        }
        // Production error handling (no stack trace)
        res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }
};

export default errorHandler