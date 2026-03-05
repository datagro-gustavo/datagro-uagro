// src/components/utils/getSessionConfig.js
import { quadros } from "../config/config";

// Retorna o objeto de configuração de uma sessão específica por name
export const getQuadrosConfig = (name) => quadros.find((s) => s.name === name);


