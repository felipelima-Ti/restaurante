export const removeCpfPunctation =  (cpf : string) => {
  return cpf.replace (/[\.\-]/g, "");
};

/**
 * 
 * Valida um CPF brasileiro.
 * @param cpf - CPF em formato string (com ou sem pontos e traço).
 * @returns `true` se o CPF for válido, caso contrário `false`.
 */
export function isValidCpf(cpf: string): boolean {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/[^\d]+/g, '');
  
    // Valida o tamanho e evita CPFs inválidos conhecidos
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  
    // Validação do primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;
  
    // Validação do segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;
  
    return true;
  }