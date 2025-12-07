var webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
var path = require("path");
const GlobEntries = require("webpack-glob-entries");
const glob = require('glob');

GetEntries = (globPath) => {
    var files = glob.sync(globPath);
    var entries = {};

    for (var i = 0; i < files.length; i++) {
        var entry = files[i];
        let entryKey =  path.join(...[path.dirname(entry),path.basename(entry, path.extname(entry))])
        console.log(entryKey)
        entryKey = entryKey.replace('src/','')

        entries[entryKey] = './' + entry;
    }
    return entries;
}
module.exports = {
    mode: "development",
    entry : GetEntries("./src/**/*_test.js"),
    output: {
        path: path.resolve(__dirname, "dist"),
        libraryTarget: "commonjs",
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                // by default, it resolves `node_modules`
            },
        ],
    },
    stats: {
        colors: true,
    },
    plugins: [new CleanWebpackPlugin()],
    externals: /^(k6|https?\:\/\/)(\/.*)?/,
};
