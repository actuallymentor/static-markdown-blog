// ///////////////////////////////
// Publishing to files
// ///////////////////////////////
const fs = require( 'fs' )
const pug = require( __dirname + '/parse-pug' )
const write = require( __dirname + '/publish-file' )

// Publishing posts
let publishpost = ( site, single ) => {
	// Make public folder if it does not exist
	if( !fs.existsSync( site.system.public ) ) fs.mkdirSync( site.system.public )
	return new Promise( ( resolve, reject ) => {
		let processed = {
			cat: 0,
			main: 0
		}

		// Publish in categories
		for (let i = single.meta.categories.length - 1; i >= 0; i--) {
			// Make cat folder if it doesn't exist
			if( !fs.existsSync( site.system.public + single.meta.categories[i] ) ) fs.mkdirSync( site.system.public + single.meta.categories[i] )
			// Generate page
			pug( site.system.templates + '/blog.pug', {
				site: site,
				file: single,
				category: single.meta.categories[ i ],
				url: site.system.url + single.meta.categories[ i ] + '/' + single.slug + '.html'
			} ).then( result => {
				return write( site.system.public + single.meta.categories[ i ] + '/' + single.slug + '.html', result )
			} ).then( f => {
				// Count amount of categories processed
				processed.cat ++
				// Resolve if all have been processed
				if ( processed.cat == single.meta.categories.length && processed.main == 1 ) {
					if (process.env.debug) console.log( 'Promise for publishing completed for main' )
					resolve( single )
				}
			} )
		}

		// Make posts folder if it does not exist
		if( !fs.existsSync( site.system.public + site.system.blogslug ) ) fs.mkdirSync( site.system.public + site.system.blogslug )
		// Publish to default posts folder
		pug( site.system.templates + 'blog.pug', {
			site: site,
			file: single,
			url: site.system.url + site.system.blogslug + '/' + single.slug + '.html'
		} ).then( result => {
			return write( site.system.public + site.system.blogslug + '/' + single.slug + '.html', result )
		} ).then( f => {
			// Count amount of processed articles for main folder, and I just realised that is not very elegant...
			processed.main ++
			// Resolve if all have been processed
			if ( processed.cat == single.meta.categories.length && processed.main == 1 ) {
				if (process.env.debug) console.log( 'Promise for publishing completed for main' )
				resolve( single )
			}
		} )
	} )
}

// Publish all posts
module.exports = ( site, posts ) => {
	return new Promise( ( resolve, reject ) => {
		Promise.all( [
			posts.map( post => { return publishpost( site, post ) } )
		] ).then( all => {
			resolve( posts )
		} )
	} )
}