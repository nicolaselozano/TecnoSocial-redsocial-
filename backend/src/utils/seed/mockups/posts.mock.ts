import { Comment } from '@/features/comment/commentEntity';
import { Image } from '@/features/image/imageEntity';
import { Post } from '@/features/post/postEntity';
import { TechnologyMock } from './technologies.mock';
import { MockUser } from './users.mock';

type ImageInsert = Pick<Image, 'url' | 'alt'>;
type CommentInsert = Pick<Comment, 'content'> & {
  user: MockUser;
};

export type PostMock = Pick<Post, 'content' | 'title'> & {
  comments?: CommentInsert[];
  images: ImageInsert[];
  likes: MockUser[];
  author: MockUser;
  techonologies: TechnologyMock[];
};

export const MOCK_POSTS: PostMock[] = [
  {
    content: 'Exploring TypeORM in-depth with some practical examples.',
    title: 'Understanding TypeORM Basics',
    author: 'username',
    techonologies: ['React', 'Nextjs'],
    comments: [
      {
        user: 'martin',
        content: 'este es un comentario falso',
      },
      {
        user: 'ezequiel',
        content: 'este es un comentario falso',
      },
      {
        user: 'melina',
        content: 'este es un comentario falso',
      },
    ],
    images: [
      {
        url: 'http://image-url-1',
        alt: 'post image',
      },
      {
        url: 'http://image-url-2',
        alt: 'post image',
      },
      {
        url: 'http://image-url-3',
        alt: 'post image',
      },
    ],
    likes: ['ezequiel', 'martin', 'sofia'],
  },
  {
    content: 'Here are some best practices for writing clean and maintainable TypeScript code.',
    title: 'TypeScript Best Practices',
    author: 'ezequiel',
    likes: ['username'],
    techonologies: ['Express'],
    images: [
      {
        url: 'http://image-url',
        alt: 'post image',
      },
    ],
    comments: [
      {
        content: 'este es un comentario falso',
        user: 'felipe',
      },
    ],
  },
  {
    content: "A guide to using TypeORM's query builder for more complex queries.",
    title: 'Mastering TypeORM Query Builder',
    author: 'felipe',
    likes: ['fabricio', 'melina', 'santiago'],
    techonologies: [],
    images: [
      {
        url: 'http://image-url',
        alt: 'post image',
      },
    ],
  },
];

export const totalPosts = MOCK_POSTS.length;
