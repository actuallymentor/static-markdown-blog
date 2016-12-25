// Configs
const site = require( __dirname + '/system/modules/config' )

// Get md and fs managers
const blog = require( __dirname + '/system/modules/controller.js' )
const del = require( 'del' )

// Read and publish all posts
blog.clean( site ).then( f => {
	// Publish posts
	blog.publish.posts( site )
	// Copy all assets from source
	blog.assets( site ).then( f => {
		console.log( 'Assets copied' )
	} )
	// Publish index page
	blog.publish.index( site )
} )