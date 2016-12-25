// Get md and fs managers
const md = require( __dirname + '/compilemd' )
const pug = require( __dirname + '/compilepug' )
const path = require( 'path' )
const slug = require( __dirname + '/toslug' )

const fs = require( 'fs' )


// ///////////////////////////////
// Publishing of individual posts
// ///////////////////////////////

let publishpost = ( targetFolder, template, sourceFile, site ) => {

	// Path of the template file
	let templatePath = site.system.templates + template + '.pug'
	// Filename
	let fileName = sourceFile.replace(/^.*[\\\/]/, '').split( '.' )[0]
	// Meta file of this post
	let meta = JSON.parse( fs.readFileSync( path.dirname( sourceFile ) + fileName + '.md.json' ) )
	// Generate the post slug
	meta.slug = slug( meta.title )

	return new Promise( ( resolve, reject ) => {
		let processed = {
			cat: 0,
			main: 0
		}
		// Generate html from markdown
		md( sourceFile ).then( html => {
			// Make a file in all of the category folders
			for (var i = meta.categories.length - 1; i >= 0; i--) {
				// Create the category folder if it does not yet exist
				if( !fs.existsSync( targetFolder + meta.categories[i] ) ) fs.mkdirSync( targetFolder + meta.categories[i] )
				// Compile pug to final html and write it to file
				pug( templatePath, {

					// Site data
					site: site,
					meta: meta,

					// Page content
					content: html,
					
					// Page metadata
					currentURL: site.system.baseURL + meta.categories[i] + '/' + meta.slug,
					updated: (meta.updated.length > 0) ? meta.updated : meta.published

				}, targetFolder + meta.categories[i] + '/' + meta.slug + '.html' ).then( published => {
					if (process.env.debug) console.log( 'Post published to category' )
					processed.cat ++
					if ( processed.cat == meta.categories.length && processed.main == 1 ) {
						if (process.env.debug) console.log( 'Promise for publishing completed for category' )
						resolve( meta )
					}
				} )
			}
			// Check if default folder exists
			if( !fs.existsSync( targetFolder + site.system.blogslug ) ) fs.mkdirSync( targetFolder + site.system.blogslug  )
			// Publish the post to the default posts folder
			pug( templatePath, {

					// Site data
					site: site,
					meta: meta,

					// Page content
					content: html,

					// Page metadata
					currentURL: site.system.baseURL + site.system.blogslug + '/' + meta.slug,
					updated: (meta.updated.length > 0) ? meta.updated : meta.published
						
				}, targetFolder + site.system.blogslug + '/' + meta.slug + '.html' ).then( published => {
					if (process.env.debug) console.log( 'Published to default directory' )
					processed.main ++
					if ( processed.cat == meta.categories.length && processed.main == 1 ) {
						if (process.env.debug) console.log( 'Promise for publishing completed for main' )
						resolve( meta )
					}
				} )
		} )
	} )
}

// ///////////////////////////////////
// Control the publishing of the index
// ///////////////////////////////////

let publishindex = ( allPosts, site ) => {
	return new Promise( ( resolve, reject ) => {
		// Render index.pug with all of the articles in there
		pug( site.system.templates + 'index.pug', {
			// Send the array of posts 
			allPosts: allPosts,
			// Send the site info
			site: site,
			// Current url ( is base url )
			currentURL: site.system.baseURL,
			// Update the last updated time
			updated: new Date().getFullYear(),
			// Metadate needed for the header
			meta: {
				title: site.identity.title
			}
		}, site.system.public + 'index.html' ).then( posthtml => {
			// Resolve with post html
			resolve( posthtml )
		} )
	} )
}

module.exports = {
	post: publishpost,
	index: publishindex
}