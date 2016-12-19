// Grab marky & fs
const markdown = require( 'marked' )
const fs = require( 'fs' )

// Promise structure for returning markdown
let md = file => {
	return new Promise( ( resolve, reject ) => {
		fs.readFile( file, ( err, data ) => {
			if ( err ) reject( err )
			resolve( markdown( String( data ) ) )
		} )
	} )
}

module.exports = md