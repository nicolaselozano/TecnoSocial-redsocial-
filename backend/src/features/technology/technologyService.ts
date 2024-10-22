import { BadRequestError } from '@/utils/errors';
import { generateRandomColor } from '@/utils/generateRandomColor';
import { predefinedColors } from '@/utils/predefinedColors';
import { Technology } from './technologyEntity';
import { technologyRepository } from './technologyRepository';

class TechnologyService {
  async createTechnology(name: Technology['name']) {
    const technology = await technologyRepository.getTechnologyByName(name);

    if (technology) {
      throw new BadRequestError(`Technology already exists`);
    }

    const existingTechnologies = await technologyRepository.getAllTechnologies();
    const usedColors = existingTechnologies.map((tech) => tech.color);

    const availableColors = predefinedColors.filter((color) => !usedColors.includes(color));

    let colorToAssign;
    if (availableColors.length > 0) {
      colorToAssign = availableColors[0];
    } else {
      colorToAssign = generateRandomColor();
    }

    const newTechnology = await technologyRepository.createTechnology({ name, color: colorToAssign });
    return newTechnology;
  }
}

export const technologyService = new TechnologyService();
