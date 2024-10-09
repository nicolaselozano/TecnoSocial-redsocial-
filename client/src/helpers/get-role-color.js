import rolesData from "../data/perfil-roles.json";

export const getRoleColor = (roleName) => {
  const role = rolesData.roles.find((r) => r.name === roleName.toLowerCase());
  return role ? role.color : "#000000";
};
