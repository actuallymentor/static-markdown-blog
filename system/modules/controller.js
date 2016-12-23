// Dependencies
const newpost = require( __dirname + '/newpost' )
const site = require( __dirname + '/config' )
const read = require( __dirname + '/readposts' )
const publish = require( __dirname + '/publish' )
const assets = require( __dirname + '/copyassets' )
const del = require( 'del' )
const fs = require( 'fs' )

let controller = {
	clean: function( ) {
		return new Promise( ( resolve, reject ) => {
			// Delete old files
			console.log( 'Deleting all previous build files synchronously' )
			del.sync( [ site.system.public + '/*' ] )
			resolve( )
		} )
	},
	makepost: function( ) {
		newpost( site.system.content )
	},
	publish: {
		posts: function( ) {
			return new Promise( ( resolve, reject ) => {
				console.log( 'Publishing posts' )
				read.posts( site.system.content ).then( postfiles => {
					for (var i = postfiles.length - 1; i >= 0; i--) {
						publish.post( site.system.public, 'blog', site.system.content + '/' + postfiles[i] ).then( meta => {
							console.log( 'Post published in all categories' )
						} )
					}
					resolve( )
				} )
			} )
		},
		index: function( ) {
			return new Promise( ( resolve, reject ) => {
				read.meta( ).then( meta => {
					resolve( meta )
				} )
			} )
		}
	},
	assets: assets
}

module.exports = controller