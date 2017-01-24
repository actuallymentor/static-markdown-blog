const fs = require( 'fs' )
const del = require( 'del' )

// ///////////////////////////////
// Publishers
// ///////////////////////////////
const feed = require( __dirname + '/publish-rss' )
const publishposts = require( __dirname + '/publish-posts' )
const publishcats = require( __dirname + '/publish-cats' )
const fileman = require( __dirname + '/parse-files' )
const sitemap = require( __dirname + '/publish-sitemap' )
const publishindex = require( __dirname + '/publish-index' )
const publishsearch = require( __dirname + '/publish-search' )
const optimizeimages = require( __dirname + '/parse-images' )
const copyassets = require( __dirname + '/parse-assets' )


// ///////////////////////////////
// Main controllers
// ///////////////////////////////

let publishall = site => {
	return new Promise( ( resolve, reject ) => {
		fileman.read( site ).then( files => {
			return Promise.all( [
				fileman.parseposts( site, files ),
				fileman.parsepages( site, files ),
				fileman.parseall( site, files )
			] )
		} ).then( content => {
			//Add categories to site variable ( this is local )
			site.cats = content[ 0 ].allcats
			return Promise.all( [
				// Publish the index page
				publishindex( site, content[ 0 ].parsedfiles ),
				// Publish the search page
				publishsearch( site, content[ 2 ].parsedfiles ),
				// Publish the categories
				publishcats( site, content[ 0 ].parsedfiles ),
				// Publish the posts separately
				publishposts( site, content[ 0 ].parsedfiles, content[ 1 ].parsedfiles ),
				// Publish the sitemap
				sitemap.make( site, content[ 0 ].parsedfiles, content[ 1 ].allcats, content[ 1 ].parsedfiles ),
				// Publish the RSS feed
				feed.rss( site, content[ 2 ].parsedfiles ),
				// Publish the podcast feed
				feed.podcast( site, content[ 2 ].parsedfiles )
			] )
		} ).then( resolve ).catch( reject )
	} )
}

let clean = site => {
	return new Promise( ( resolve, reject ) => {
		// Delete old files
		if (process.env.debug) console.log( 'Deleting all previous build files' )
		// Synchronously delete the old files
		if( fs.existsSync( site.system.public ) ) del.sync( [ site.system.public ] )
		resolve( )
	} )
}

let handleassets = site => {
	return new Promise( ( resolve, reject ) => {
		if( process.env.debug || process.env.skip ) console.log( 'Image skip is ' + process.env.dev + ' dev and ' + process.env.skip + ' skip ' )
		// The process.env.dev determines whether the images are re-processed or not. Webpack controls this throuh the env variable skip=true
		if ( process.env.dev == 'true' ) copyassets( site ).then( f => {
			if( process.env.debug ) console.log( 'NOT Optimizing images' )
			// return optimizeimages( site )
		} ).then( resolve ).catch( reject )
		if ( process.env.dev == 'false' || !process.env.dev ) copyassets( site ).then( f => {
			if( process.env.debug ) console.log( 'Optimizing images' )
			return optimizeimages( site )
		} ).then( resolve ).catch( reject )
	} )
}


module.exports = {
	publish: publishall,
	clean: clean,
	assets: handleassets
}