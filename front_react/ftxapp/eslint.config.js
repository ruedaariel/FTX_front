import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

import pluginImport from "eslint-plugin-import";

export default [
  {
    files: ["src/**/*.{js,jsx}"],
    plugins: {
      import: pluginImport
    },
    rules: {
      // Marca imports rotos (archivos inexistentes, rutas mal escritas, casing incorrecto)
      "import/no-unresolved": "error",

      // Ignora variables no usadas (ruido en fase de desarrollo)
      "no-unused-vars": "off"
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".css"]
        }
      }
    }
  }
];