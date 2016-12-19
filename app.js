// Get md and fs managers
const md = require( __dirname + '/system/modules/compilemd' )
const pug = require( __dirname + '/system/modules/compilepug' )

const fs = require( 'fs' )
const ncp = require( 'ncp' )

md( __dirname + '/content/post.md' ).then( markdown => {
	let template = __dirname + '/system/templates/blog.pug'
	let target = __dirname + '/public/post.html'
	pug( template, { content: markdown }, target )
} )

// Copy all assets from source
ncp( __dirname + '/content/assets', __dirname + '/public/assets', err => {
	if ( err ) throw err
} )