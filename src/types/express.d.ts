// express.d.ts or types/express.d.ts
import * as express from 'express';

declare global {
  namespace Express {
    export interface Request {
      user: {
        role: string; // or use the specific type for `role`
        _id: string;
        [key: string]: any; // You can add other properties here as needed
      };
    }
  }
}
