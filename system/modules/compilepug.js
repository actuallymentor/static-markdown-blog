const pug = require( 'pug' )
const fs = require( 'fs' )

let render = ( pugfile, locals, target ) => {
	return new Promise( ( resolve, reject ) => {
		let pugresult = pug.renderFile( pugfile, locals )
		fs.writeFile( target, pugresult, err => {
			if ( err ) reject( err )
			resolve( pugresult )
		} )
	} )
}

module.exports = render