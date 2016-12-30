// Dependencies
const newpost = require( __dirname + '/newpost' )
const read = require( __dirname + '/readposts' )
const publish = require( __dirname + '/publish' )
const assets = require( __dirname + '/copyassets' )
const del = require( 'del' )
const fs = require( 'fs' )


// Spider in the web using the modules to manage the blog
let controller = {
	// Delete previous build
	clean: function( site ) {
		return new Promise( ( resolve, reject ) => {
			// Delete old files
			if (process.env.debug) console.log( 'Deleting all previous build files synchronously' )
			// Synchronously delete the old files
			if( fs.existsSync( site.system.public ) ) del.sync( [ site.system.public ] )
			resolve( )
		} )
	},
	// A simple copy/paste to a NEWPOST file
	makepost: function( site ) {
		return new Promise( ( resolve, reject ) => {
			newpost( site.system.content ).then( f => {
				resolve( )
			} )
		} )
	},
	// Functions related to translating code to static files
	publish: {
		// Publish posts ( non category view )
		posts: function( site ) {
			return new Promise( ( resolve, reject ) => {
				// Counter of processed files
				let processed = 0
				if (process.env.debug) console.log( 'Publishing posts' )
				// Read all posts from disk
				read.posts( site.system.content ).then( postfiles => {
					// Loop over the posts
					for (var i = postfiles.length - 1; i >= 0; i--) {
						// Publish each post
						publish.post( site.system.public, 'blog', site.system.content + '/' + postfiles[i], site ).then( metas => {
							if (process.env.debug) console.log( 'Processed post' )
							processed ++
							// Resolve when all are processed
							if ( processed == postfiles.length ) resolve( { files: postfiles, metas: metas } )
						} )
					}					
				} )
			} )
		},
		index: function( site ) {
			return new Promise( ( resolve, reject ) => {
				// Read all meta files
				read.meta( site ).then( allmeta => {
					// Publish the index with an array filled with meta file objects
					publish.index( allmeta, site ).then( html => {
						// Resolve with all meta files
						resolve( html )
					} )
				} )
			} )
		},
		categories: function( site ) {
			return new Promise( ( resolve, reject ) => {
				// Read all meta files
				read.meta( site ).then( allmeta => {
					// Publish the index with an array filled with meta file objects
					publish.categories( allmeta, site ).then( f => {
						// Resolve with all meta files
						resolve( )
					} )
				} )
			} )
		}
	},
	assets: assets
}

module.exports = controller