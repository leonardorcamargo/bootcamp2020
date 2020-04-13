import { Request, Response } from 'express';

import createUserService from './services/CreateUser';

export function helloWorld(req: Request, res: Response) {
  return res.json({ message: 'ok' });
}

export function createUser(req: Request, res: Response) {
  const user = createUserService({
    name: 'Leonardo',
    password: '123',
    techs: [ 'Node.js', { title: 'javascript', experience: 100 } ]
  });

  console.log(user.email);
}
