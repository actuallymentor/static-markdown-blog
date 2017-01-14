// ///////////////////////////////
// Publishing the index
// ///////////////////////////////
const pug = require( __dirname + '/parse-pug' )
const write = require( __dirname + '/publish-file' )
const fs = require( 'fs' )

module.exports = ( site, allposts ) => {
	// Make public folder if it does not exist
	if( !fs.existsSync( site.system.public ) ) fs.mkdirSync( site.system.public )
	return new Promise( ( resolve, reject ) => {
		// Generate page
		pug( site.system.templates + 'index.pug', {
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
		} ).then( page => {
			write( site.system.public + 'index.html', page ).then( resolve )
		} )
	} )
}