import { Request } from 'express';

export function getPaginatedParams(req: Request) {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 5;
  const search = req.query.search ? String(req.query.search) : '';

  return { page, limit, search };
}
