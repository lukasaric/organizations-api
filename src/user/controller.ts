import { Request, Response } from 'express';
import autobind from 'auto-bind';
import { IContainer } from 'bottlejs';
import IUserRepository from './interfaces/repository';

class UserController {
  #repository: IUserRepository

  constructor({ userRepositoryFactory }: IContainer) {
    this.#repository = userRepositoryFactory;
    autobind(this);
  }

  async fetch(_: Request, res: Response): Promise<Response> {
    const data = await this.#repository.findAll();
    return res.json({ data });
  }

  async get(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.userId);
    const data = await this.#repository.findOne(id);
    return res.json({ data });
  }

  async create({ body }: Request, res: Response): Promise<Response> {
    const data = await this.#repository.persistAndFlush(body);
    return res.json({ data });
  }
}

export default UserController;
