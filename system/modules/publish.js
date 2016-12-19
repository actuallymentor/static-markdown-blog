// Get md and fs managers
const md = require( __dirname + '/compilemd' )
const pug = require( __dirname + '/compilepug' )
const site = require( __dirname + '/config' )
const path = require( 'path' )

const fs = require( 'fs' )
const del = require( 'del' )

// Delete old files
console.log( 'Deleting all previous build files synchronously' )
del.sync( [ site.public + '/*' ] )

let publish = ( targetFolder, template, sourceFile ) => {
	// Configs
	let templatePath = site.templates + template + '.pug'
	let fileName = sourceFile.replace(/^.*[\\\/]/, '').split( '.' )[0]
	let targetFile = '/' + fileName + '.html'
	let meta = JSON.parse( fs.readFileSync( path.dirname( sourceFile ) + '.' + fileName + '.md.json' ) )

	return new Promise( ( resolve, reject ) => {
		// Generate html from markdown
		md( sourceFile ).then( html => {
			// // Make a file in all of the category folders
			// for (var i = meta.categories.length - 1; i >= 0; i--) {
			// 	// Create the category folder if it does not yet exist
			// 	if( !fs.existsSync( targetFolder + meta.categories[i] ) ) fs.mkdirSync( targetFolder + meta.categories[i] )
			// 	// Compile pug to final html and write it to file
			// 	pug( templatePath, {
			// 		title: site.title + ' - ' + meta.title,
			// 		sitetitle: site.title,
			// 		sitedesc: site.desc,
			// 		pagedesc: meta.desc,
			// 		twitter: site.twitter,
			// 		url: site.baseUrl + fileName,
			// 		content: html
			// 	}, targetFolder + meta.categories[i] + targetFile ).then( published => {
			// 		console.log( 'Post published to category' )
			// 	} )
			// }
			// Check if default folder exists
			if( !fs.existsSync( targetFolder + '/posts' ) ) fs.mkdirSync( targetFolder + '/posts' )
			// Publish the post to the default posts folder
			pug( templatePath, {
					title: site.title + ' - ' + meta.title,
					sitetitle: site.title,
					sitedesc: site.desc,
					pagedesc: meta.desc,
					twitter: site.twitter,
					url: site.baseUrl + fileName,
					content: html
				}, targetFolder + '/posts/' + targetFile ).then( published => {
					console.log( 'Published to default directory' )
				} )
		} )
		resolve( )
	} )
}

module.exports = publish