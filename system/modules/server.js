// Local server config
const express = require( 'express' )
const app = express( )
const forcehtml = require( __dirname + '/forcehtml' )
const site = require( __dirname + '/config' )

// Append .html to non .html requests
app.use( forcehtml )

// Static the public folder
app.use( express.static( site.system.public ) )

// Listen on localhost
app.listen( 8000, live => {
	console.log( 'Server running on localhost:8000' )
} )

module.exports = app