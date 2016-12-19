// Get md and fs managers
const publish = require( __dirname + '/system/modules/publish' )
const site = require( __dirname + '/system/modules/config' )

const fs = require( 'fs' )
const ncp = require( 'ncp' )

// Globals

// Publish the demo post
publish( site.public, 'blog', site.content + '/post.md' ).then( post => {
	console.log( 'Post published' )
} )

// Copy all assets from source
ncp( __dirname + '/content/assets', __dirname + '/public/assets', err => {
	if ( err ) throw err
} )