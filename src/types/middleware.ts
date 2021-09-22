import { NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors';

export interface IErrorMiddleware {
  handle(err: HttpError | Error, req: Request, res: Response, next: NextFunction): Response;
}

export interface IMiddleware {
  handle(req: Request, res: Response, next: NextFunction, id?: string): void;
}
