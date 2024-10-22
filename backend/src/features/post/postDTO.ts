import { z } from 'zod';

export const postSchemaDTO = z.object({
  title: z
    .string()
    .min(5, 'title must contain at least 5 characters')
    .max(140, 'title must contain less than 140 characters'),
  content: z
    .string()
    .min(5, 'content must contain at least 5 characters')
    .max(240, 'content must contain less than 140 characters'),
  technologies: z.string().array().optional(),
});

export type PostDTO = z.infer<typeof postSchemaDTO>;
