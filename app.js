// Configs
const site = require( __dirname + '/system/modules/config' )

// Get md and fs managers
const blog = require( __dirname + '/system/modules/controller.js' )
const del = require( 'del' )

// Read and publish all posts
blog.clean( ).then( f => {
	// Publish posts
	blog.publish.posts( )
	// Copy all assets from source
	blog.assets( ).then( f => {
		console.log( 'Assets copied' )
	} )
	// Publish index page
	blog.publish.index( ).then( meta => {
		console.log( meta )
	} )
} )