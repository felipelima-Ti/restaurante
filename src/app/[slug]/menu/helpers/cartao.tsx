/**
 * Formata um número de cartão de crédito no formato '#### #### #### ####'
 * Remove todos os caracteres não numéricos e agrupa em blocos de 4 dígitos
 * 
 * @param cartao - string contendo os números do cartão (pode vir desformatada)
 * @returns string formatada
 */
export function formatarCartao(cartao: string): string {
  const apenasNumeros = cartao.replace(/\D/g, '');
  const grupos = apenasNumeros.match(/.{1,4}/g); // grupos de até 4 dígitos
  return grupos ? grupos.join(' ') : '';
}