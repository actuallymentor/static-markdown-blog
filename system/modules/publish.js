// Get md and fs managers
const md = require( __dirname + '/compilemd' )
const pug = require( __dirname + '/compilepug' )
const site = require( __dirname + '/config' )
const path = require( 'path' )

const fs = require( 'fs' )


let publishpost = ( targetFolder, template, sourceFile ) => {
	// Configs
	let templatePath = site.system.templates + template + '.pug'
	let fileName = sourceFile.replace(/^.*[\\\/]/, '').split( '.' )[0]
	let targetFile = '/' + fileName + '.html'
	let meta = JSON.parse( fs.readFileSync( path.dirname( sourceFile ) + '.' + fileName + '.md.json' ) )

	return new Promise( ( resolve, reject ) => {
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
					fileName: fileName,
					
					// Page metadata
					currentURL: site.system.baseURL + '/' + meta.categories[i] + '/' + fileName,
					updated: (meta.updated.length > 0) ? meta.updated : meta.published,

				}, targetFolder + meta.categories[i] + targetFile ).then( published => {
					console.log( 'Post published to category' )
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
					fileName: fileName,

					// Page metadata
					currentURL: site.system.baseURL + '/' + site.system.blogslug + '/' + fileName,
					updated: (meta.updated.length > 0) ? meta.updated : meta.published,
						
				}, targetFolder + site.system.blogslug + targetFile ).then( published => {
					console.log( 'Published to default directory' )
				} )
		} )
		resolve( )
	} )
}

module.exports = {
	post: publishpost
}