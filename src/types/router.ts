import { IContainer } from 'bottlejs';
import { Router } from 'express';

export type RouterFactory = (container: IContainer) => Router;
