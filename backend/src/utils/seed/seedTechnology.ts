import { technologyService } from '@/features/technology/technologyService';
import { TECHNOLOGIES_MOCK } from './mockups/technologies.mock';

export async function seedTechnology() {
  await Promise.all(TECHNOLOGIES_MOCK.map(async (tech) => await technologyService.createTechnology(tech)));
}
