// src/components/utils/getSessionConfig.js
import { marketsIds } from '../config/config'

// Retorna o objeto de configuração de uma sessão específica por name
export const getMarketids = (sessionName) =>
  marketsIds.find((s) => s.name === sessionName);
