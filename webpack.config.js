
const path=require('path')
const nodeExternals = require('webpack-node-externals')

module.exports= {
    entry:path.join(__dirname,'main_server','mainEntry.ts'),
    output:{
      path: path.resolve(__dirname, 'dist'),
      filename: 'server.js'
    },
    resolve:{
      extensions:['.ts','.js']
    },
    module:{
      rules:[
        {
          test:/\.ts$/,
          exclude:/nodu_modules/,
          use:[
            {loader:'ts-loader'},
          ],
        },
      ]
    },
    externals: [nodeExternals()],
    target: 'node',
    node: {
      // Need this when working with express, otherwise the build fails
      __dirname: false,   // if you don't put this is, __dirname
      __filename: false,  // and __filename return blank or /
    },
};

//https://medium.com/@binyamin/creating-a-node-express-webpack-app-with-dev-and-prod-builds-a4962ce51334