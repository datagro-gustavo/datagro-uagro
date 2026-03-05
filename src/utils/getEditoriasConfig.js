// src/components/utils/getSessionConfig.js
import { editorias } from "../config/config";

// Retorna o objeto de configuração de uma sessão específica por name
export const getEditoriasConfig = (() => {
    const slug = (item) => item
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    const editoriasMenu = editorias
        .filter((item) => item.navBar === 1)
        .map((item) => {
            return {
                label: item?.categoria,
                link: item?.link,
                subcategorias: item?.subcategorias
            };
        });

    return {
        editorias: editoriasMenu
    }
}

)