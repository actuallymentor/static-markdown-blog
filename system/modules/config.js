// import modules
const fs = require( 'fs' )

// grab, parse and export the config file
module.exports = JSON.parse( fs.readFileSync( __dirname + '/../config.json' ) )