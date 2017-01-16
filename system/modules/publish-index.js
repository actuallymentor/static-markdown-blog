// ///////////////////////////////
// Publishing the index
// ///////////////////////////////
const pug = require( __dirname + '/parse-pug' )
const write = require( __dirname + '/publish-file' )
const fs = require( 'fs' )
const pfs = require( __dirname + '/parse-fs' )

module.exports = ( site, allposts ) => {
	// Make public folder if it does not exist
	pfs.mkdir( site.system.public ).then( f => {
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
				return write( site.system.public + 'index.html', page )
			} ).then( resolve ).catch( reject )
		} )
	} )
}