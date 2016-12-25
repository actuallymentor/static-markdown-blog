// Grab marky & fs
const markdown = require( 'marked' )
const fs = require( 'fs' )

// Promise structure for returning html from md
let md = file => {
	return new Promise( ( resolve, reject ) => {
		// Read the specified file from disk
		fs.readFile( file, ( err, data ) => {
			if ( err ) reject( err )
			// Resolve with the html and replace relative assets to absolute
			resolve( markdown( String( data ).replace( './assets', '/assets' ) ) )
		} )
	} )
}

module.exports = md