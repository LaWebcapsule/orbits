module.exports = {
    out: './docs',
    entryPoints: [
      './src/core/actions',
      // './src/helpers',
      // './src/packages'
    ],
    entryPointStrategy: 'packages',
    /* pluginPages: {
      pages: [
        {
          moduleRoot: true,
          title: '@wbce/orbits',
          source : 'main.md',
          children : [{
            title : 'action',
            source : 'action.md'
          }]
        }
      ]
    } */
};