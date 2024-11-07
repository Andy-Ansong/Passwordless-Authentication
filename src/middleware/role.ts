import { Request, Response, NextFunction } from 'express';

const role = (roles: string[] = []) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).send({
          status: "error",
          message: "Forbidden. You do not have access to this resource."
        });
      }
      next();
    } catch (error) {
      return res.status(403).send({
        status: "error",
        message: "Forbidden. You do not have access to this resource."
      });
    }
  };
};

export default role;
