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
	return new Promise( ( resolve, reject ) => {
		let actions = 0
		// Make visible file
		fs.writeFile( target + '/NEWPOST.md', '# New Post', err => {
			if ( err ) throw err
			actions ++
			if( actions == 2 ) resolve( )
		} )
		// Meta file
		fs.writeFile( target + '/NEWPOST.md.json', JSON.stringify( metatemplate, null, '\t' ), err => {
			if ( err ) throw err
			actions ++
			if( actions == 2 ) resolve( )
		} )
	} )
}

module.exports = create