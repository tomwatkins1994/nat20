/** @typedef {import("prettier").Config} PrettierConfig */
/** @typedef {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig */

/** @type { PrettierConfig | SortImportsConfig | TailwindConfig } */
export const config = {
    tabWidth: 8,
    useTabs: true,
    semi: true,
    singleQuote: false,
    trailingComma: "all",
    // Plugins
    plugins: [
        "@ianvs/prettier-plugin-sort-imports",
    ],
    // Sort imports
    importOrder: [
        "<TYPES>",
        "<THIRD_PARTY_MODULES>",
        "",
        "<TYPES>^[.|..|~|@/]",
        "^@/",
        "^~/",
        "^[../]",
        "^[./]",
    ],
    importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
    importOrderTypeScriptVersion: "4.4.0",
};