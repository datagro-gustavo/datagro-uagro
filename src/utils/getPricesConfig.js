// src/components/utils/getSessionConfig.js
import { ativos } from "../config/config";

// Retorna o objeto de configuração de uma sessão específica por name
export const getPriceConfig = (name) => ativos.find((s) => s.name === name);


