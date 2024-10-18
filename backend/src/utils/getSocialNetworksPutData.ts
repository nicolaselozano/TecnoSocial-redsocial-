import { Request } from 'express';

export function getSocialNetworksPutData(body: Request['body']) {
  const { linkedin, github, facebook, instagram, gitlab, twitter } = body;

  return {
    linkedin,
    github,
    facebook,
    instagram,
    gitlab,
    twitter,
  };
}
