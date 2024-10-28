import con from '@/config/database';
import { Role } from './roleEntity';

class RoleRepository {
  private repository = con.getRepository(Role);

  async getAllRoles() {
    const roles = await this.repository.find();
    return roles.map((role) => role.name);
  }
}

export const roleRepository = new RoleRepository();
