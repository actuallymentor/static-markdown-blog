// Dependencies
const newpost = require( __dirname + '/newpost' )
const site = require( __dirname + '/config' )
const read = require( __dirname + '/readposts' )
const publish = require( __dirname + '/publish' )
const assets = require( __dirname + '/copyassets' )
const del = require( 'del' )
const fs = require( 'fs' )

let parseMeta = ( path, file ) => {
	return new Promise( ( resolve, reject ) => {
		fs.readFile( path + file, ( err, data ) => {
			resolve( { file: JSON.parse( data ) } )
		} )
	} )
}

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
						publish( site.system.public, 'blog', site.system.content + '/' + postfiles[i] ).then( meta => {
							console.log( 'Post published in all categories' )
						} )
					}
					resolve( )
				} )
			} )
		},
		index: function( ) {
			return new Promise( ( resolve, reject ) => {
				let allmeta = []
				let parsed = 0
				read.meta( site.system.content ).then( metafiles => {
					for (var i = metafiles.length - 1; i >= 0; i--) {
						parseMeta( site.system.content, metafiles[ i ] ).then( postobject => {
							allmeta.push( postobject )
							parsed ++
							if ( parsed == metafiles.length ) resolve( )
						} )
					}
				} )
			} )
		}
	},
	assets: assets
}

module.exports = controller