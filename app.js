const md = require( __dirname + '/system/modules/compilemd' )

md( '#I am a heading' ).then( markdown => {
	console.log( markdown )
} )