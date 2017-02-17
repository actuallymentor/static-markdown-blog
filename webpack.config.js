// Browser sync stuff
let BrowserSyncPlugin = require( 'browser-sync-webpack-plugin' )
const bs = require( 'browser-sync' )

// File system management
const fs = require( 'fs' )

// Webpack and css
let autoprefixer = require ( 'autoprefixer' )
let webpack = require( 'webpack' )

// Blog actions
const blog = require( __dirname + '/system/modules/publisher' )

// Configs
const site = require( __dirname + '/system/modules/config' )

// ///////////////////////////////
// Plugins
// ///////////////////////////////
let thebs
const servername = 'bsserver'
const bsconfig = {
  host: 'localhost',
  open: true,
  port: 3000,
  server: { 
    baseDir: [ site.system.public ],
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
}
const bsyncplugconfig = {
  name: servername,
  callback: f => { if ( process.env.NODE_ENV == 'development' ) thebs = bs.get( servername ) }
}

const uglifyconfig = {
  compress: {
    warnings: false
  }
}

const envconfig = {
  'process.env': {
    NODE_ENV: JSON.stringify( 'production' )
  }
}


const pluginarray = ( env, server ) => {
  let plugins = []

  if ( env == 'production' ) {
    if ( server ) plugins.push( 
        new BrowserSyncPlugin( bsconfig, bsyncplugconfig )
    )
    plugins.push(
      new webpack.optimize.UglifyJsPlugin( uglifyconfig )
    )
    plugins.push(
      new webpack.DefinePlugin( envconfig )
    )
  } else {
    plugins.push(
      new BrowserSyncPlugin( bsconfig, bsyncplugconfig )
    )
  }

  return plugins
}

const maps = env => {
  if( env == 'production' ) {
    return 'cheap-module-source-map'
  } else {
    return 'eval'
  }
}

// ///////////////////////////////
// Building & watching
// ///////////////////////////////

// Initial build
blog.clean( site ).then( f => {
  return blog.publish( site )
} ).then( links => {
  if ( process.env.debug ) console.log( '\nInitial build, posts published' )
  return blog.assets( site )
} ).then( f => {
  if ( process.env.debug ) console.log( '\nInitial asset publihing done' )
  if ( process.env.NODE_ENV == 'development' ) thebs.reload( )
} )

// Watch for pug file changes
const towatch = [ 'pug' ]

if ( process.env.NODE_ENV == 'development' ) fs.watch( site.system.templates, ( eventType, filename ) => {
  if ( eventType != 'change' || filename.indexOf( towatch ) == -1 ) return
  if ( process.env.debug ) console.log( 'Pug template changed' )
  // Delete old build and generate pug files
  return blog.publish( site ).then( f => { if ( process.env.debug ) console.log( 'Repeat build done' ); thebs.reload( ) } ).catch( console.log.bind( console ) )
} )

// Watch for content file changes
if ( process.env.NODE_ENV == 'development' ) fs.watch( site.system.content, ( eventType, filename ) => {
  if ( eventType != 'change' || filename.indexOf( 'md' ) == -1 ) return
  if ( process.env.debug ) console.log( 'Content template changed' )
  // Delete old build and generate new
  blog.publish( site ).then( links => {
    if ( process.env.debug ) console.log( '\nInitial build, posts published' )
    return blog.assets( site )
  } ).then( f => {
    if ( process.env.debug ) console.log( '\nInitial asset publihing done' )
    if ( process.env.NODE_ENV == 'development' ) thebs.reload( )
  } ).catch( console.log.bind( console ) )
} )

if ( process.env.debug ) console.log( 'Environment is ' + process.env.NODE_ENV )
if ( process.env.debug ) console.log( 'Source maps are using ' + maps( process.env.NODE_ENV ) )

module.exports = {
  entry: site.system.theme + 'main.js',
  output: {
    filename: site.system.public + 'assets/js/app.js'
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