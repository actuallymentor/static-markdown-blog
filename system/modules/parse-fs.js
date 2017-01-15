const walk = require( 'recursive-readdir' )
const fs = require( 'fs' )
const mkdirp = require( 'mkdirp' )

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

// Make directory if it does not exist yet
const mkdir = path => {
	return new Promise( ( resolve, reject ) => {
		fs.access( path, err => {
			if ( !err ) return resolve( )
			mkdirp( path, err => {
				if ( err ) return reject( )
				resolve( )
			} )
		} )
	} )
}

module.exports = {
	readdir: readdir,
	readfile: file,
	mkdir: mkdir
}