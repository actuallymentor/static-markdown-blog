#! /usr/bin/env node

// Dependencies
const newpost = require( __dirname + '/system/modules/newpost' )
const site = require( __dirname + '/system/modules/config' )
const readposts = require( __dirname + '/system/modules/readposts' )
const publish = require( __dirname + '/system/modules/publish' )
const assets = require( __dirname + '/system/modules/copyassets' )

let action = process.argv[ 2 ]

switch( action ) {
	case "new":
		newpost( site.system.content )
	break
	case "server":
		const server = require( __dirname + '/system/modules/server' )
	break
	case "dev":
		const dev = require( __dirname + '/app.js' )
	break
	case "publish": 
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
	break
}