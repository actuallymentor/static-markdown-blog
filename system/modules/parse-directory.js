const walk = require( 'recursive-readdir' )

const readdir = dir => {
	return new Promise( ( resolve, reject ) => {
		walk( dir, ( err, files ) => {
			if err return reject( err )
			resolve( files )
		} )
	} )
}