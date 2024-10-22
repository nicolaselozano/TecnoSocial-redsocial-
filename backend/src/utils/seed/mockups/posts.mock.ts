import { Comment } from '@/features/comment/commentEntity';
import { Image } from '@/features/image/imageEntity';
import { Post } from '@/features/post/postEntity';

type ImageInsert = Pick<Image, 'url' | 'alt'>;
type CommentInsert = Pick<Comment, 'content'>;

export type PostMock = Pick<Post, 'content' | 'title'> & {
  images: ImageInsert[];
  comments?: CommentInsert[];
};

export const FIRST_USER_POSTS: PostMock[] = [
  {
    content: 'Exploring TypeORM in-depth with some practical examples.',
    title: 'Understanding TypeORM Basics',
    comments: [
      {
        content: 'hola este es un comentario',
      },
      {
        content: 'hola este es el segundo comentario',
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
  },
  {
    content: 'Here are some best practices for writing clean and maintainable TypeScript code.',
    title: 'TypeScript Best Practices',
    images: [
      {
        url: 'http://image-url',
        alt: 'post image',
      },
    ],
  },
  {
    content: "A guide to using TypeORM's query builder for more complex queries.",
    title: 'Mastering TypeORM Query Builder',
    images: [
      {
        url: 'http://image-url',
        alt: 'post image',
      },
    ],
  },
  {
    content: 'Leveraging decorators in TypeScript to create concise and readable code.',
    title: 'Decorators in TypeScript',
    images: [
      {
        url: 'http://image-url',
        alt: 'post image',
      },
    ],
  },
  {
    content: 'Understanding entity relationships and how to handle them in TypeORM.',
    title: 'Entity Relationships in TypeORM',
    images: [
      {
        url: 'http://image-url',
        alt: 'post image',
      },
    ],
  },
  {
    content: 'How to use TypeORM with NestJS for scalable application development.',
    title: 'Using TypeORM with NestJS',
    images: [
      {
        url: 'http://image-url',
        alt: 'post image',
      },
    ],
  },
];

export const SECOND_USER_POSTS: PostMock[] = [
  {
    content: 'Here are some best practices for writing clean and maintainable TypeScript code.',
    title: 'TypeScript Best Practices',
    images: [
      {
        url: 'http://image-url',
        alt: 'post image',
      },
    ],
  },
  {
    content: 'Here are some best practices for writing clean and maintainable TypeScript code.',
    title: 'TypeScript Best Practices',
    images: [
      {
        url: 'http://image-url',
        alt: 'post image',
      },
    ],
  },
];

export const totalPosts = FIRST_USER_POSTS.length + SECOND_USER_POSTS.length;
