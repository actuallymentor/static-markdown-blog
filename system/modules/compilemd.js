const marky = require( 'marky-markdown' )

let md = input => {
	return new Promise( ( resolve, reject ) => {
		resolve( marky( input ) )
	} )
}

module.exports = md