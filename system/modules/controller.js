// Dependencies
const newpost = require( __dirname + '/newpost' )
const site = require( __dirname + '/config' )
const readposts = require( __dirname + '/readposts' )
const publish = require( __dirname + '/publish' )
const assets = require( __dirname + '/copyassets' )
const del = require( 'del' )

let controller = {
	makepost: function( ) {
		newpost( site.system.content )
	},
	publish: function( ) {
		return new Promise( ( resolve, reject ) => {
			// Delete old files
			console.log( 'Deleting all previous build files synchronously' )
			del.sync( [ site.system.public + '/*' ] )
			console.log( 'Publishing posts' )
			readposts( site.system.content ).then( posts => {
				for (var i = posts.length - 1; i >= 0; i--) {
					publish( site.system.public, 'blog', site.system.content + '/' + posts[i] ).then( meta => {
						console.log( 'Post published in all categories' )
					} )
				}
				resolve( )
			} )
		} )
		
	},
	assets: assets
}

module.exports = controller