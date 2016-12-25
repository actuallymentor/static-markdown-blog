const pug = require( 'pug' )
const fs = require( 'fs' )

// Render pug to html
let render = ( pugfile, locals, target ) => {
	return new Promise( ( resolve, reject ) => {
		// Render pug with the locals ( that being the pug variables )
		let pugresult = pug.renderFile( pugfile, locals )
		// Write the result to file
		fs.writeFile( target, pugresult, err => {
			if ( err ) reject( err )
			// Resolve with the pug result
			resolve( pugresult )
		} )
	} )
}

module.exports = render