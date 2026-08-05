export const ADMIN_CPFS =
  process.env.ADMIN_CPFS?.split(",").map((cpf) => cpf.trim()) ?? [];