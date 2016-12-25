#! /usr/bin/env node

// Dependencies
const blog = require( __dirname + '/system/modules/controller.js' )

let action = process.argv[ 2 ]

// ///////////////////////////////
// Command line control of the blog
// ///////////////////////////////
switch( action ) {
	case "new":
		blog.makepost( )
	break
	case "publish": 
		blog.publish.posts( )
	break
	default:
		console.log( 'Unknown command' )
	break
}