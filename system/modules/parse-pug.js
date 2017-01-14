const pug = require( 'pug' )
const sandrimg = require( __dirname + '/parse-sandr-images' )

const compilepug = ( source, locals ) => {
	return new Promise( ( resolve, reject ) => {
		sandrimg( pug.renderFile( source, locals ) ).then( resolve )
	} )
}

module.exports = compilepug