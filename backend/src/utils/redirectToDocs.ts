import { Request, Response } from 'express';

export function redirectToDocs(req: Request, res: Response) {
  res.redirect('/api/api-docs');
}
