// ///////////////////////////////
// Reading and parsing
// ///////////////////////////////
const fs = require( 'fs' )
// Module to generate url safe slug from file name
const slug = require( __dirname + '/toslug' )
const markdown = require( 'marked' )

// Recursive directory reader
const pfs = require( __dirname + '/parse-fs' )

// Set up promise error handling, makes .catch less needed
process.on( 'unhandledRejection', ( error, promise ) => {
	console.log( 'UPR: ' + promise + ' with ' + error )
	console.log( promise )
	console.log( error.stack )
} )

// Read all posts from disk
const readmd = site => {
	// Filter function checks for .md files
	let filter = files => {
		return files.filter( thing => {
			return thing.indexOf( '.md' ) != -1 ? true : false
		} )
	}
	// Promise that returns only .md files in an array
	return new Promise( ( resolve, reject ) => {
		pfs.readdir( site.system.content ).then( filter ).then( resolve )
	} )
}

// Parse files into approachable data
const parse = ( site, files ) => {

	// Generate filedata from raw file
	const parsefile = file => {

		// Get metadata based on the first ocurrence of { and }
		let metadata = JSON.parse( file.data.substring( file.data.indexOf( '{' ), file.data.indexOf( '}' ) + 1 ) )

		// Check if updated if populated
		metadata.updated = ( metadata.updated.length > 0 ) ? metadata.updated : metadata.published
		metadata.duration = metadata.duration || '10:00'

		// Get the content based on the position of the first ```\n
		let content = file.data.slice( file.data.indexOf( '```\n' ) + 4, file.data.length )

		// Construct the post object
		let filedata = {
			file: file.name,
			slug: slug( file.name.replace(/^.*[\\\/]/, '').split( '.' )[0] ),
			path: site.system.content + file.name,
			meta: metadata,
			raw: content,
			// Generate html after replacing local references to ./assets to blogurl/assets
			html: markdown( String( content ).replace( /[\.\/]*assets/ig, site.system.url + 'assets' ) ),
			// Links array to which category links will be added below
			links: [ site.system.url + site.system.blogslug + '/' + slug( file.name.replace(/^.*[\\\/]/, '').split( '.' )[0] ) ]
		}

		// Add category links
		for (let j = filedata.meta.categories.length - 1; j >= 0; j--) {
			// Add category link to parsed element
			filedata.links.push( site.system.url + filedata.meta.categories[j] + '/' + filedata.slug )
		}

		// Return the file data for use in the promise chain
		return filedata

	}

	// Get categories from the parsedfile structure
	const categories = parsedfiles => {
		let cats = []
		// Loop over the posts
		for (let i = parsedfiles.length - 1; i >= 0; i--) {
			// Loop over the categories
			for (let j = parsedfiles[i].meta.categories.length - 1; j >= 0; j--) {
				if( cats.indexOf( parsedfiles[i].meta.categories[j] ) == -1 ) cats.push( parsedfiles[i].meta.categories[j] )
			}
		}
		return cats
	}

	// Return the controlling promise
	return new Promise( ( resolve, reject ) => {
		// Trackers for the number of files and categories processed, I intend to properly promisify these
		let allcats = []
		// Read all the files
		Promise.all(
			files.map( file => { return pfs.readfile( file ).then( parsefile ) } )
		).then( parsedfiles => { resolve( { parsedfiles: parsedfiles, allcats: categories( parsedfiles ) } ) } )
	} )
}

module.exports = {
	read: readmd,
	parse: parse
}