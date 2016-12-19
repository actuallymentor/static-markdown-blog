// Get md and fs managers
const md = require( __dirname + '/compilemd' )
const pug = require( __dirname + '/compilepug' )
const site = require( __dirname + '/config' )

const fs = require( 'fs' )

let publish = ( targetFolder, template, sourceFile ) => {
	// Configs
	let templatePath = site.templates + template + '.pug'
	let fileName = sourceFile.replace(/^.*[\\\/]/, '').split( '.' )[0]
	let targetFile = targetFolder + '/' + fileName + '.html'

	return new Promise( ( resolve, reject ) => {
		md( sourceFile ).then( html => {
			resolve( pug( templatePath, {
				title: site.title + ' - ' + 'Current page title',
				sitetitle: site.title,
				sitedesc: site.desc,
				pagedesc: 'This is a good page',
				twitter: site.twitter,
				url: site.baseUrl + fileName,
				content: html
			}, targetFile ) )
		} )
	} )
}

module.exports = publish