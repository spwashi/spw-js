module.exports = {
    presets:
                    [
                        '@babel/preset-env',
                        '@babel/preset-typescript',
                    ],
    plugins:
                    [
                        ['@babel/plugin-proposal-decorators', {
                            decoratorsBeforeExport: true
                        }],
                        '@babel/plugin-proposal-class-properties',
                        '@babel/plugin-proposal-optional-chaining',
                        '@babel/plugin-transform-runtime',
                        '@babel/plugin-proposal-private-methods',
                        [
                            "module-resolver",
                            {
                                "root":  ["./dist"],
                                "alias": {
                                    "@constructs": "./dist/constructs",
                                    "@grammar":    "./dist/parser/grammar"
                                }
                            }
                        ]
                    ],
    exclude:        [],
    compact:        false,
    retainLines:    true,
    minified:       false,
    inputSourceMap: false,
    sourceMaps:     false,
};

