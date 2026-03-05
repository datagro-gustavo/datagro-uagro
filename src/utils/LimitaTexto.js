export const limitarTexto = (texto = '', n = 120) => {
  if (texto.length <= n) return texto;
  const cortar = texto.slice(0, n);
  const proximoEspaco = cortar.lastIndexOf(' ');
  return (proximoEspaco > 0 ? cortar.slice(0, proximoEspaco) : cortar) + '…';
};