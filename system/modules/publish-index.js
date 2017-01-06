// ///////////////////////////////
// Publishing the index
// ///////////////////////////////
const fs = require( 'fs' )
const pug = require( 'pug' )

module.exports = ( site, allposts ) => {
	// Make public folder if it does not exist
	if( !fs.existsSync( site.system.public ) ) fs.mkdirSync( site.system.public )
	return new Promise( ( resolve, reject ) => {
		// Generate page
		let page = pug.renderFile( site.system.templates + 'index.pug', {
			site: site,
			posts: allposts,
			url: site.system.url,
			// Meta structure
			file: {
				meta: {
					title: site.identity.title,
					desc: site.identity.desc,
					featuredimg: site.identity.image,
					published: site.system.today
				}
			}
		} )
		// Write index to disk
		fs.writeFile( site.system.public + 'index.html', page, err => {
			if ( err ) reject( err )
			// Resolve
			resolve( page )
		} )
	} )
}