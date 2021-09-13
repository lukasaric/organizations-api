import { Request, Response } from 'express';
import autobind from 'auto-bind';
import { IContainer } from 'bottlejs';
import { InstanceFactory } from '../types/module';
import IUserRepository from './interfaces/repository';

class UserController {
  #repositoryFactory: InstanceFactory<IUserRepository>

  constructor({ userRepositoryFactory }: IContainer) {
    this.#repositoryFactory = userRepositoryFactory;
    autobind(this);
  }

  async getAll(_: Request, res: Response): Promise<Response> {
    const repository = this.#repositoryFactory.instance();
    const data = await repository.findAll();
    return res.json({ data });
  }

  async get(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.userId);
    const repository = this.#repositoryFactory.instance();
    const data = await repository.findOne(id);
    return res.json({ data });
  }
}

export default UserController;
