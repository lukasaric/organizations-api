import { Request, Response } from 'express';
import autobind from 'auto-bind';
import { IContainer } from 'bottlejs';
import IUserRepository from './interfaces/repository';
import User from './model';

class UserController {
  #repository: IUserRepository

  constructor({ userRepository }: IContainer) {
    this.#repository = userRepository;
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
    const { firstName, lastName, email, role } = body;
    const data = new User(firstName, lastName, email, role);
    await this.#repository.persistAndFlush(data);
    return res.json({ data });
  }
}

export default UserController;
