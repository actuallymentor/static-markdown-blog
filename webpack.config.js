// Browser sync stuff
let BrowserSyncPlugin = require( 'browser-sync-webpack-plugin' )
let WebpackOnBuildPlugin = require( 'on-build-webpack' )
let WebpackPreBuildPlugin = require( 'pre-build-webpack' )

// Webpack and css
let autoprefixer = require ( 'autoprefixer' )
let webpack = require( 'webpack' )

// Blog actions
const blog = require( __dirname + '/system/modules/publisher.js' )

// Configs
const site = require( __dirname + '/system/modules/config' )

// ///////////////////////////////
// Plugins
// ///////////////////////////////
let bsync = new BrowserSyncPlugin( {
  host: 'localhost',
  port: 3000,
  server: { 
    baseDir: ['public'],
    serveStaticOptions: {
      extensions: ['html']
    }
  },
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
let setenv = new webpack.DefinePlugin( {
  'process.env': {
    NODE_ENV: JSON.stringify( 'production' )
  }
} )
let makeugly = new webpack.optimize.UglifyJsPlugin( {
  compress: {
    warnings: false
  }
})

let buildblog = new WebpackPreBuildPlugin( stats => {
  if ( process.env.debug ) console.log( 'Before build: ' )
  blog.clean( site ).then( f => {
    blog.publish( site ).then( posts => {
      if ( process.env.debug ) if ( process.env.debug ) console.log( 'Posts published' )
    } )
  } )
} )

let copyassets = new WebpackOnBuildPlugin( stats => {
  if ( process.env.debug ) console.log( 'After build:' )
  blog.assets( site ).then( f => {
    if ( process.env.debug ) console.log( 'Assets copied' )
  } )
} )

const pluginarray = ( env, server ) => {
  if ( env == 'production' ) {
    if ( server ) {
      return [
      setenv,
      makeugly,
      bsync,
      buildblog,
      copyassets
      ]
    } else {
      return [
      setenv,
      makeugly,
      buildblog,
      copyassets
      ]
    }
  } else if ( env == 'development' ) {
    return [
    bsync,
    buildblog,
    copyassets
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

if ( process.env.debug ) console.log( 'Environment is ' + process.env.NODE_ENV )
if ( process.env.debug ) console.log( 'Source maps are using ' + maps( process.env.NODE_ENV ) )

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
  plugins: pluginarray( process.env.NODE_ENV, process.env.server )
}