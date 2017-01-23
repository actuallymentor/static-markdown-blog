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
const publishtoposts = ( site, single ) => {
	return new Promise( ( resolve, reject ) => {
		// Publish to default posts folder
		pfs.mkdir( site.system.public + site.system.blogslug ).then( f => {
			return pug( site.system.templates + single.meta.template + '.pug', {
				site: site,
				file: single,
				url: site.system.url + site.system.blogslug + '/' + single.slug + '.html'
			} )
		} ).then( result => {
			return write( site.system.public + site.system.blogslug + '/' + single.slug + '.html', result )
		} ).then( resolve ).catch( reject )
	} )
}

// Publishing posts
const publishpost = ( site, single ) => {

	return new Promise( ( resolve, reject ) => {
		Promise.all(
			single.meta.categories.map( category => { return publishtocat( site, single, category ) } )
		).then( f => {
			return publishtoposts( site, single )
		} ).then( resolve ).catch( reject )
	} )
	
}

// Publish all posts
module.exports = ( site, posts ) => {
	return new Promise( ( resolve, reject ) => {
		pfs.mkdir( site.system.public ).then( f => {
			return Promise.all( [
				posts.map( post => { return publishpost( site, post ) } )
			] )
		} ).then( resolve )
	} )
}