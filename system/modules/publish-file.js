const fs = require( 'fs' )

const writefile = ( where, what ) => {
	return new Promise( ( resolve, reject ) => {
		fs.writeFile( where, what, err => {
			if ( err ) return reject( err )
			// Resolve
			resolve( what )
		} )
	} )
}

module.exports = writefile