const fs = require( 'fs' )
const site = require( __dirname + '/config' )

// Post metadata template
let post = '```json\n\
{\n\
    "title": "One Blog Post to Rule Them All",\n\
    "desc": "One description to find them",\n\
    "categories": [ "cat" ],\n\
    "template":, "blog",\n\
    "type": "post",\n\
    "published": "2016-12-20",\n\
    "updated": "",\n\
    "featuredimg": "/assets/image.svg"\n\
}\n\
```\n\
# I am a post woo!\n\
\n\
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.\n\
'

// Write default data to disk
let create = target => {
	return new Promise( ( resolve, reject ) => {
		// Make visible file
		fs.writeFile( target + '/NEWPOST.md', post, err => {
			if ( err ) throw reject( err )
			resolve( )
		} )
	} )
}

if ( process.argv[ 2 ] == 'new' ) {
	create( site.system.content )
}

module.exports = create