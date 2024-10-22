import { faker } from '@faker-js/faker';

export function createPost() {
  return {
    content: faker.definitions.commerce.product_description,
    technologies: faker.definitions.hacker.adjective,
    title: faker.food.adjective(),
  };
}
