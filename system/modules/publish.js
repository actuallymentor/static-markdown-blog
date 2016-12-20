// Get md and fs managers
const md = require( __dirname + '/compilemd' )
const pug = require( __dirname + '/compilepug' )
const site = require( __dirname + '/config' )
const path = require( 'path' )

const fs = require( 'fs' )
const del = require( 'del' )

// Delete old files
console.log( 'Deleting all previous build files synchronously' )
del.sync( [ site.system.public + '/*' ] )

let publish = ( targetFolder, template, sourceFile ) => {
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
					
					// Site info
					title: site.identity.title + ' - ' + meta.title,
					sitetitle: site.identity.title,
					sitedesc: site.identity.desc,
					logo: site.identity.logo,

					// Page info
					featuredimg: meta.featuredimg,
					content: html,
					
					// Page metadata
					currentURL: site.system.baseURL + '/' + meta.categories[i] + '/' + fileName,
					published: meta.published,
					updated: (meta.updated.length > 0) ? meta.updated : meta.published,
					pagedesc: meta.desc,
					baseURL: site.system.baseURL,

					// Canonicalisation
					canonical: site.system.baseURL + '/' + site.system.blogslug + '/' + fileName,

					// Author info
					twitter: site.author.twitter,
					firstname: site.author.firstname,
					lastname: site.author.lastname,
					authorURL: site.author.url

				}, targetFolder + meta.categories[i] + targetFile ).then( published => {
					console.log( 'Post published to category' )
				} )
			}
			// Check if default folder exists
			if( !fs.existsSync( targetFolder + site.system.blogslug ) ) fs.mkdirSync( targetFolder + site.system.blogslug  )
			// Publish the post to the default posts folder
			pug( templatePath, {

					// Site info
					title: site.identity.title + ' - ' + meta.title,
					sitetitle: site.identity.title,
					sitedesc: site.identity.desc,
					logo: site.identity.logo,

					// Page info
					featuredimg: meta.featuredimg,
					content: html,

					// Page metadata
					currentURL: site.system.baseURL + '/' + site.system.blogslug + '/' + fileName,
					published: meta.published,
					updated: (meta.updated.length > 0) ? meta.updated : meta.published,
					pagedesc: meta.desc,
					baseURL: site.system.baseURL,

					// Canonicalisation
					canonical: site.system.baseURL + '/' + site.system.blogslug + '/' + fileName,

					// Author info
					twitter: site.author.twitter,
					firstname: site.author.firstname,
					lastname: site.author.lastname,
					authorURL: site.author.url
					
					
				}, targetFolder + site.system.blogslug + targetFile ).then( published => {
					console.log( 'Published to default directory' )
				} )
		} )
		resolve( )
	} )
}

module.exports = publish