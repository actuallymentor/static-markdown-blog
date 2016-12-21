let BrowserSyncPlugin = require('browser-sync-webpack-plugin')
let autoprefixer = require ( 'autoprefixer' )
let webpack = require( 'webpack' )

const pluginarray = env => {
  if ( env == 'production' ) {
    return [
    new webpack.DefinePlugin( {
      'process.env': {
        NODE_ENV: JSON.stringify( 'production' )
      }
    } ),
    new webpack.optimize.UglifyJsPlugin( {
      compress: {
        warnings: false
      }
    })
    ]
  } else if ( env == 'development' ) {
    return [
    new BrowserSyncPlugin( {
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['public'] },
      notify: {
        styles:  [
        "display: none",
        "padding: 15px",
        "font-family: sans-serif",
        "position: fixed",
        "font-size: 0.9em",
        "z-index: 9999",
        "bottom: 0px",
        "right: 0px",
        "border-bottom-left-radius: 5px",
        "background-color: #1B2032",
        "margin: 0",
        "color: white",
        "text-align: center"
        ]
      }
    } )
    ]
  } else {
    return []
  }
}

const maps = env => {
  if( env == 'production' ) {
    return 'cheap-module-source-map'
  } else {
    return 'eval'
  }
}

console.log( 'Environment is ' + process.env.NODE_ENV )
console.log( 'Source maps are using ' + maps( process.env.NODE_ENV ) )

module.exports = {
  entry: __dirname + '/theme/main.js',
  output: {
    filename: __dirname + '/content/assets/js/app.js'
  },
  module: {
    loaders: [
    {
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    },
    {
      test: /\.scss$/,
      loaders: ["style", "css", "sass", "postcss"]
    }
    ]
  },
  devtool: maps( process.env.NODE_ENV ),
  postcss: [
  autoprefixer( { browsers: ['last 2 versions'] } )
  ],
  plugins: pluginarray( process.env.NODE_ENV )
}