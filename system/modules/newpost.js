const fs = require( 'fs' )

// Post metadata template
let metatemplate = {
	"title": "One Blog Post to Rule Them All",
	"desc": "One description to find them",
	"categories": [ "categoricallyawesome" ],
	"published": "2016-12-20",
	"updated": "",
	"featuredimg": "/assets/image.svg"
}

// Write default data to disk
let create = target => {
	// Make visible file
	fs.writeFile( target + '/NEWPOST.md', '# New Post', err => { if ( err ) throw err } )
	// Meta file
	fs.writeFile( target + '/NEWPOST.md.json', JSON.stringify( metatemplate, null, '\t' ), err => { if ( err ) throw err } )
}

module.exports = create