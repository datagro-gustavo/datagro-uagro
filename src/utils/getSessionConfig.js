// src/components/utils/getSessionConfig.js
import { sessionsConfig } from "../config/config";

// Retorna o objeto de configuração de uma sessão específica por name
export const getSessionConfig = (sessionName) =>
  sessionsConfig.find((s) => s.name === sessionName);
