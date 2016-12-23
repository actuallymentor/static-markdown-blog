// Dependencies
const newpost = require( __dirname + '/newpost' )
const site = require( __dirname + '/config' )
const read = require( __dirname + '/readposts' )
const publish = require( __dirname + '/publish' )
const assets = require( __dirname + '/copyassets' )
const del = require( 'del' )
const fs = require( 'fs' )


// Spider in the web using the modules to manage the blog
let controller = {
	// Delete previous build
	clean: function( ) {
		return new Promise( ( resolve, reject ) => {
			// Delete old files
			console.log( 'Deleting all previous build files synchronously' )
			// Synchronously delete the old files
			del.sync( [ site.system.public + '/*' ] )
			resolve( )
		} )
	},
	// A simple copy/paste to a NEWPOST file
	makepost: function( ) {
		newpost( site.system.content )
	},
	// Functions related to translating code to static files
	publish: {
		// Publish posts ( non category view )
		posts: function( ) {
			return new Promise( ( resolve, reject ) => {
				console.log( 'Publishing posts' )
				// Read all posts from disk
				read.posts( site.system.content ).then( postfiles => {
					// Loop over the posts
					for (var i = postfiles.length - 1; i >= 0; i--) {
						// Publish each post
						publish.post( site.system.public, 'blog', site.system.content + '/' + postfiles[i] )
					}
					// Resolve empty
					resolve( )
				} )
			} )
		},
		index: function( ) {
			return new Promise( ( resolve, reject ) => {
				// Read all meta files
				read.meta( ).then( allmeta => {
					// Publish the index with an array filled with meta file objects
					publish.index( allmeta )
					// Resolve with all meta files
					resolve( allmeta )
				} )
			} )
		}
	},
	assets: assets
}

module.exports = controller