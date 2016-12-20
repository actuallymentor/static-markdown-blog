// Blog configs
const site = require( __dirname + '/config' )
const fs = require( 'fs' )

let middleware = ( req, res, next ) => {
	// Check if there is a period in the request
	if ( req.path.indexOf( '.' ) === -1 ) {
		// Hypothesise what file user wants
		let file = site.system.public + req.path + '.html'
		// Check if the html file exists in the first place
		fs.exists(file, ( exists ) => {
			// If the file exists, make that the request
			if ( exists ) req.url += '.html'
			next( )
		} )
	}
	else next( )
}

module.exports = middleware