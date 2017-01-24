// ///////////////////////////////
// Publishing the index
// ///////////////////////////////
const pug = require( __dirname + '/parse-pug' )
const write = require( __dirname + '/publish-file' )
const fs = require( 'fs' )
const pfs = require( __dirname + '/parse-fs' )

const onlymeta = ( site, allposts ) => {
	return allposts.map( post => {
		post.meta.slug = post.slug
		post.meta.url = site.system.url + site.system.blogslug + '/' + post.slug
		post.meta.featuredimg = site.system.url + post.meta.featuredimg
		return post.meta
	} )
}

module.exports = ( site, allposts ) => {
	// Make public folder if it does not exist
	pfs.mkdir( site.system.public ).then( f => {
		return new Promise( ( resolve, reject ) => {
			// Generate page
			pug( site.system.templates + 'search.pug', {
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
				return write( site.system.public + 'search.html', page )
			} ).then( f => {
				return write( site.system.public + 'posts.json', JSON.stringify( onlymeta( site, allposts ) ) )
			} ).then( resolve ).catch( reject )
		} )
	} )
}