import { ADMIN_CPFS } from "../lib/admin-cpfs";

export const isAdmin = (cpf: string) => {
  return ADMIN_CPFS.includes(cpf);
};