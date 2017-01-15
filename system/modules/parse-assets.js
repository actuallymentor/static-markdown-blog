// Recursive copy library
const ncp = require( 'ncp' )

let copyassets = site => {
	return new Promise( ( resolve, reject ) => {
		// Recursively copy all assets from the source to the public folder
		ncp( site.system.content + 'assets', site.system.public + 'assets', err => {
			if ( err ) return reject(  err )
			resolve( )
		} )
	} )
}

module.exports = copyassets