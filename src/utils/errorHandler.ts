import { Request, Response, NextFunction } from "express";

// Modify the errorHandler to accept functions returning Promise<Response>
export default function errorHandler(handler: (req: Request, res: Response, next: NextFunction) => Promise<Response>) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            return await handler(req, res, next);
        } catch (error) {
            next(error); // Ensure proper error handling
        }
    };
}
