const { input, output } = require('./configs')[0];

const devBuildConfig = { ...input, ...{ output } };

module.exports = devBuildConfig;
