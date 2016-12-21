// Configs
const site = require( __dirname + '/system/modules/config' )

// Get md and fs managers
const readposts = require( __dirname + '/system/modules/readposts' )
const publish = require( __dirname + '/system/modules/publish' )
const assets = require( __dirname + '/system/modules/copyassets' )
const del = require( 'del' )

// Activate webserver
const server = require( __dirname + '/system/modules/server' )

// Delete old files
console.log( 'Deleting all previous build files synchronously' )
del.sync( [ site.system.public + '/*' ] )

// Read and publish all posts
readposts( site.system.content ).then( posts => {
	for (var i = posts.length - 1; i >= 0; i--) {
		publish( site.system.public, 'blog', site.system.content + '/' + posts[i] ).then( meta => {
			console.log( 'Post published in all categories' )
		} )
	}
} )


// Copy all assets from source
assets(  ).then( f => {
	console.log( 'Assets copied' )
} )

module.exports = server