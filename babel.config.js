module.exports = {
    presets: [
        ['@babel/preset-react', {
            runtime: "automatic",
            typescript: true,
        }],
        ['@babel/preset-env', {
            targets: {
                node: 'current',
            },
        }],
        ["@babel/preset-typescript", {
            "isTSX": true,
            "allExtensions": true
        }],
    ],
};