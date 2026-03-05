// src/components/utils/getSessionConfig.js
import { instituctionalLinks } from '../config/config'

// Retorna o objeto de configuração de uma sessão específica por name
export const getInstituctionalLinks = () => {
  const editoriasMenu = instituctionalLinks.map((item) => {
    return {
      name: item.name,
      description: item.description,
      button: item.button.text,
      href: item.button.href
    };
  });
  return editoriasMenu;
}
