// Configs
const site = require( __dirname + '/system/modules/config' )

// Get md and fs managers
const publish = require( __dirname + '/system/modules/publish' )
const fs = require( 'fs' )
const ncp = require( 'ncp' )

// Activate webserver
const server = require( __dirname + '/system/modules/server' )

// Publish the demo post
publish( site.public, 'blog', site.content + '/post.md' ).then( meta => {
	console.log( 'Post published in all categories' )
} )

// Copy all assets from source
ncp( __dirname + '/content/assets', __dirname + '/public/assets', err => {
	if ( err ) throw err
} )

