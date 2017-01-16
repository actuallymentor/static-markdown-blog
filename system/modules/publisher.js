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
const optimizeimages = require( __dirname + '/parse-images' )
const copyassets = require( __dirname + '/parse-assets' )


// ///////////////////////////////
// Main controllers
// ///////////////////////////////

let publishall = site => {
	return new Promise( ( resolve, reject ) => {
		// Read all post files
		fileman.read( site ).then( files => {
			if( process.env.test ) console.log( 'Files were read' )
			// Parse the files to objects
			fileman.parse( site, files ).then( ( { parsedfiles, allcats } ) => {
				//Add categories to site variable ( this is local )
				site.cats = allcats
				if( process.env.test ) console.log( 'Files were parsed' )
				Promise.all( [
					// Publish the index page
					publishindex( site, parsedfiles ),
					// Publish the categories
					publishcats( site, parsedfiles ),
					// Publish the posts separately
					publishposts( site, parsedfiles ),
					// Publish the sitemap
					sitemap.make( site, parsedfiles, allcats ),
					// Publish the RSS feed
					feed.rss( site, parsedfiles ),
					// Publish the podcast feed
					feed.podcast( site, parsedfiles )
					] ).then( result  => { 
						resolve( result[ 3 ] ) 
					} ).catch( err => { reject( err ) } )
				} ).catch( err => { throw err } )
		} ).catch( err => { throw err } )
	} )
}

let clean = site => {
	return new Promise( ( resolve, reject ) => {
		// Delete old files
		if (process.env.debug) console.log( 'Deleting all previous build files synchronously' )
		// Synchronously delete the old files
		if( fs.existsSync( site.system.public ) ) del.sync( [ site.system.public ] )
		resolve( )
	} )
}

let handleassets = site => {
	return new Promise( ( resolve, reject ) => {
		if( process.env.debug || process.env.skip ) console.log( 'Image skip is ' + process.env.dev )
		// The process.env.dev determines whether the images are re-processed or not. Webpack controls this throuh the env variable skip=true
		if ( process.env.dev ) copyassets( site ).then( resolve )
		if ( !process.env.dev ) copyassets( site ).then( f => {
			return optimizeimages( site )
		} ).then( resolve )
	} )
}


module.exports = {
	publish: publishall,
	clean: clean,
	assets: handleassets
}