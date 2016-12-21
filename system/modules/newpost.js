const fs = require( 'fs' )

let metatemplate = {
	"title": "One Blog Post to Rule Them All",
	"desc": "One description to find them",
	"categories": [ "categoricallyawesome" ],
	"published": "2016-12-20",
	"updated": "",
	"featuredimg": "/assets/image.svg"
}

let create = target => {
	fs.writeFile( target + '/NEWPOST.md', metatemplate, err => { if ( err ) throw err } )
	fs.writeFile( target + '/.NEWPOST.md.json', '# New Post', err => { if ( err ) throw err } )
}

module.exports = create