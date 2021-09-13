import { NextFunction, Request, Response } from 'express';
import autobind from 'auto-bind';
import { HttpError } from 'http-errors';
import { IContainer } from 'bottlejs';
import { IErrorMiddleware } from '../types/middleware';
import Logger from 'bunyan';
import { ValidationError } from 'joi';

class ErrorHandler implements IErrorMiddleware {
  #logger: Logger;

  constructor({ logger }: IContainer) {
    this.#logger = logger;
    autobind(this);
  }

  handle(error: HttpError, req: Request, res: Response, _: NextFunction): void {
    const logOpts = { route: req.originalUrl, query: req.query };
    const log = this.#logger.child(logOpts);
    log.error(error);
    if (error instanceof ValidationError) res.status(400).json({ error });
    if (!(error instanceof HttpError) || error.statusCode === 500) {
      res.status(500).end();
    }
    res
      .status(error.statusCode)
      .json({ error, statusCode: error.statusCode });
  }
}

export default ErrorHandler;
