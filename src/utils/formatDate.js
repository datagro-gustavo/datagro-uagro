// utils/formatDate.js
export function formatDate(dateString) {
  if (!dateString) return "";

  const [year, month, day] = dateString.split("-").map(Number);

  const meses = [
    "jan", "fev", "mar", "abr", "mai", "jun",
    "jul", "ago", "set", "out", "nov", "dez"
  ];

  const anoAtual = new Date().getFullYear();
  const mesAbrev = meses[month - 1];
  const diaFormatado = String(day).padStart(2, "0");

  // se for no ano atual: 09/dez
  if (year === anoAtual) {
    return `${diaFormatado}/${mesAbrev}`;
  }

  // se for de outro ano: 09/dez/2025
  return `${diaFormatado}/${mesAbrev}/${year}`;
}
