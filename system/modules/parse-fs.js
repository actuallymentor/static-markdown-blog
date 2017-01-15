const walk = require( 'recursive-readdir' )
const fs = require( 'fs' )

// Recursively get all files in a source
const readdir = dir => {
	return new Promise( ( resolve, reject ) => {
		walk( dir, ( err, files ) => {
			if ( err ) return reject( err )
			resolve( files )
		} )
	} )
}

// Read a single file
const file = file => {
	return new Promise( ( resolve, reject ) => {
		fs.readFile( file, 'utf8', ( err, data ) => {
			if ( err ) return reject( err )
			resolve( { name: file, data: data } )
		} )
	} )
}

module.exports = {
	dir: readdir,
	file: file
}