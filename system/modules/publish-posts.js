// ///////////////////////////////
// Publishing to files
// ///////////////////////////////
const fs = require( 'fs' )
const pug = require( __dirname + '/parse-pug' )
const write = require( __dirname + '/publish-file' )
const pfs = require( __dirname + '/parse-fs' )

// Post to gategory publishing workflow
const publishtocat = ( site, single, category ) => {
	return new Promise( ( resolve, reject ) => {
		pfs.mkdir( site.system.public + category ).then( f => {
			return pug( site.system.templates + single.meta.template + '.pug', {
				site: site,
				file: single,
				category: category,
				url: site.system.url + category + '/' + single.slug + '.html'
			} )
		} ).then( result => {
			return write( site.system.public + category + '/' + single.slug + '.html', result )
		} ).then( resolve ).catch( reject )
	} )
}

// Post to /post/ publishing workflow promise
const publishtoslug = ( site, single, slug ) => {
	return new Promise( ( resolve, reject ) => {
		// Publish to default posts folder
		pfs.mkdir( site.system.public + slug ).then( f => {
			return pug( site.system.templates + single.meta.template + '.pug', {
				site: site,
				file: single,
				url: site.system.url + slug + '/' + single.slug + '.html'
			} )
		} ).then( result => {
			return write( site.system.public + slug + '/' + single.slug + '.html', result )
		} ).then( resolve ).catch( reject )
	} )
}

// Publishing posts
const publishpost = ( site, single ) => {

	return new Promise( ( resolve, reject ) => {
		Promise.all(
			single.meta.categories.map( category => { return publishtocat( site, single, category ) } )
		).then( f => {
			return publishtoslug( site, single, site.system.blogslug )
		} ).then( resolve ).catch( reject )
	} )
	
}

// Publishing pages
const publishpage = ( site, single ) => {
	return new Promise( ( resolve, reject ) => {
		publishtoslug( site, single, site.system.pageslug ).then( resolve ).catch( reject )
	} )
}

// Publish all posts
module.exports = ( site, posts, pages ) => {
	return new Promise( ( resolve, reject ) => {
		pfs.mkdir( site.system.public ).then( f => {
			return Promise.all(
				pages.map( page => { return publishpage( site, page ) } )
			)
		} ).then( f => {
			return Promise.all( 
				posts.map( post => { return publishpost( site, post ) } )
			)
		} ) .then( resolve ).catch( reject )
	} )
}