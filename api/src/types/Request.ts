// src/types/Request.ts
import { Request as ExpressRequest } from 'express';

interface Request extends ExpressRequest {
  user?: {
    userId: number;
    name: string;
    role: string;
    domain: string;
  };
  body: any;
}

export default Request;
