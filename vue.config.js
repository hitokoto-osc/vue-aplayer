/* eslint-disable strict */
/* eslint-disable global-require */
// https://cli.vuejs.org/config/
// https://cli.vuejs.org/guide/build-targets.html
const path = require('path');
const { GitRevisionPlugin } = require('git-revision-webpack-plugin');

const gitRevisionPlugin = new GitRevisionPlugin();

module.exports = {
  css: { extract: false },
  pages: {
    app: {
      entry: path.resolve(__dirname, 'example/main.ts'),
      template: path.resolve(__dirname, 'example/public/index.html'),
      filename: 'index.html',
    },
  },
  devServer: {
    // https://webpack.js.org/configuration/dev-server/
    static: {
      directory: path.resolve(__dirname, 'example/public'),
    },
  },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      const copyOptions = {
        patterns: [
          {
            from: path.resolve(__dirname, 'example/public'),
            to: path.resolve(__dirname, 'demo'),
            toType: 'dir',
            noErrorOnMissing: true,
            globOptions: {
              ignore: ['index.html', '.DS_Store'],
            },
            info: {
              minimized: true,
            },
          },
        ],
      };
      // https://github.com/vuejs/vue-cli/blob/5a8abe029e0c9a16f575983f76d51c569145b0b0/packages/%40vue/cli-service-global/lib/globalConfigPlugin.js#L128-L131
      // https://github.com/vuejs/vue-cli/blob/5a8abe029e0c9a16f575983f76d51c569145b0b0/packages/%40vue/cli-service/lib/commands/build/resolveAppConfig.js#L6-L12
      // https://github.com/vuejs/vue-cli/blob/5a8abe029e0c9a16f575983f76d51c569145b0b0/packages/%40vue/cli-service/lib/config/app.js#L211-L221
      // https://github.com/vuejs/vue-cli/issues/1550#issuecomment-401786406
      config.plugin('copy').use(require('copy-webpack-plugin'), [copyOptions]);
    } else {
      // https://github.com/vuejs/vue-cli/issues/1132
      config.output.filename('[name].[hash].js').end();
    }

    // https://next.cli.vuejs.org/guide/webpack.html#replacing-loaders-of-a-rule
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule.delete('type');
    svgRule.delete('generator');
    svgRule
      .use('vue-loader')
      .loader('vue-loader') // or `vue-loader-v16` if you are using a preview support of Vue 3 in Vue CLI
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader');

    config.entry('app').clear().add('./example/main.ts');

    config.plugin('define').tap((args) => {
      Object.assign(args[0], {
        APLAYER_VERSION: JSON.stringify(require('./package.json').version),
        GIT_HASH: JSON.stringify(gitRevisionPlugin.commithash().substr(0, 7)),
      });
      return args;
    });

    // https://github.com/mozilla-neutrino/webpack-chain#config-resolve-alias
    config.resolve.alias
      .set('utils', path.resolve(__dirname, 'utils'))
      .set('@moefe/vue-audio', path.resolve(__dirname, 'packages/@moefe/vue-audio'))
      .set('@moefe/vue-store', path.resolve(__dirname, 'packages/@moefe/vue-store'))
      .set('@moefe/vue-touch', path.resolve(__dirname, 'packages/@moefe/vue-touch'))
      .set('@moefe/vue-aplayer', path.resolve(__dirname, 'packages/@moefe/vue-aplayer')); // prettier-ignore
  },
};
