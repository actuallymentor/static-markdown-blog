const fs = require( 'fs' )
const del = require( 'del' )
const ncp = require( 'ncp' )

// ///////////////////////////////
// Publishers
// ///////////////////////////////
const publishrss = require( __dirname + '/publish-rss' )
const publishposts = require( __dirname + '/publish-posts' )
const publishcats = require( __dirname + '/publish-cats' )
const publishsitemap = require( __dirname + '/publish-sitemap' )
const fileman = require( __dirname + '/file-manager' )
const sitemap = require( __dirname + '/publish-sitemap' )
const publishindex = require( __dirname + '/publish-index' )

// ///////////////////////////////
// Main controllers
// ///////////////////////////////

let publishall = site => {
	return new Promise( ( resolve, reject ) => {
		// Read all post files
		fileman.read( site ).then( files => {
			if( process.env.test ) console.log( 'Files were read' )
			// Parse the files to objects
			fileman.parse( site, files ).then( parsedfiles => {
				if( process.env.test ) console.log( 'Files were parsed' )
				Promise.all( [
					// Publish the index page
					publishindex( site, parsedfiles ),
					// Publish the categories
					publishcats( site, parsedfiles ),
					// Publish the posts separately
					publishposts( site, parsedfiles ),
					// Publish the sitemap
					sitemap.make( site, parsedfiles, new sitemap.proto( ) ),
					// Publish the RSS feed
					publishrss( site, parsedfiles )
					] ).then( result  => { 
						if( process.env.test ) console.log( '\n\nAll promised completed\n\n' )
						resolve( result[ 3 ] ) 
					} ).catch( err => { reject( err ) } )
				} )
		} )
	} )
}

let copyassets = site => {
	return new Promise( ( resolve, reject ) => {
		// Recursively copy all assets from the source to the public folder
		ncp( site.system.content + '/assets', site.system.public + '/assets', err => {
			if ( err ) reject(  err )
			// Resolve empty
			resolve( )
		} )
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


module.exports = {
	publish: publishall,
	clean: clean,
	assets: copyassets
}