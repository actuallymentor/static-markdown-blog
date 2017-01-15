const walk = require( 'recursive-readdir' )

// Recursively get all files in a source
const readdir = dir => {
	return new Promise( ( resolve, reject ) => {
		walk( dir, ( err, files ) => {
			if ( err ) return reject( err )
			resolve( files )
		} )
	} )
}

module.exports = readdir