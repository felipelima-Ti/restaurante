export const formatarEndereco = (endereco: string) => {
  return endereco
    .toLowerCase()
    .replace(/[.,\-\/\\]/g, "") // remove pontuação
    .split(' ')
    .filter(Boolean)
    .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
    .join(' ');
};