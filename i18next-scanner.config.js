module.exports = {
    input: [
        "resources/js/**/*.{js,jsx,ts,tsx}",
        "!resources/js/**/*.test.{js,jsx,ts,tsx}",
    ],
    // Output langsung ke resources/lang/{locale}.json
    output: "./resources/lang/",

    options: {
        debug: false,
        func: {
            list: ["t", "i18next.t"],
            extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
        trans: {
            component: "Trans",
            i18nKey: "i18nKey",
            extensions: [".js", ".jsx", ".ts", ".tsx"],
            fallbackKey: function (ns, value) {
                return value;
            },
        },
        lngs: ["en", "id", "ja", "fr", "de"],
        ns: ["translation"],
        defaultLng: "en",
        defaultNs: "translation",
        resource: {
            // Save langsung ke file {locale}.json di folder lang
            loadPath: "resources/lang/{{lng}}/{{ns}}.json",
            savePath: "{{lng}}/{{ns}}.json",
            jsonIndent: 2,
            lineEnding: "\n",
        },
        keySeparator: false,
        nsSeparator: false,
    },
};
