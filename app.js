// Get md and fs managers
const md = require( __dirname + '/system/modules/compilemd' )
const fs = require( 'fs' )
const ncp = require( 'ncp' )

md( __dirname + '/content/post.md' ).then( markdown => {
	fs.writeFile( __dirname + '/public/post.html', markdown, err => {
		if ( err ) throw err
	} )
} )

// Copy all assets from source
ncp( __dirname + '/content/assets', __dirname + '/public/assets', err => {
	if ( err ) throw err
} )