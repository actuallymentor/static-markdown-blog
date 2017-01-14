// ///////////////////////////////
// Reading and parsing
// ///////////////////////////////
const fs = require( 'fs' )
// Module to generate url safe slug from file name
const slug = require( __dirname + '/toslug' )
const markdown = require( 'marked' )

// Set up promise error handling, makes .catch less needed
process.on( 'unhandledRejection', ( error, promise ) => {
	console.log( 'UPR: ' + promise + ' with ' + error )
	console.log( error.stack )
} )

// Read all files from disk
const read = site => {
	return new Promise( ( resolve, reject ) => {
		fs.readdir( site.system.content, ( err, files ) => {
			if ( err ) throw err
			// Return only the .md files
			let posts = files.filter( element => {
				// Check if the current file is a markdown file
				if ( element.indexOf( '.md' ) != -1 ) return true
				return false
			} )
			resolve( posts )
		} )
	} )
}

// Parse files into approachable data
const parse = ( site, files ) => {
	return new Promise( ( resolve, reject ) => {
		// Trackers for the number of files and categories processed, I intend to properly promisify these
		let parsedfiles = []
		let allcats = []
		// Read all the files
		for (let i = files.length - 1; i >= 0; i--) {
			// Read files one by one
			fs.readFile( site.system.content + files[i], 'utf8', ( err, data ) => {
				// Get metadata based on the first ocurrence of { and }
				let metadata = JSON.parse( data.substring( data.indexOf( '{' ), data.indexOf( '}' ) + 1 ) )
				// Check ig updated if populated
				metadata.updated = (metadata.updated.length > 0) ? metadata.updated : metadata.published
				metadata.duration = metadata.duration || '10:00'
				// Get the content based on the position of the first ```\n
				let content = data.slice( data.indexOf( '```\n' ) + 4, data.length )

				// Construct the post object
				let filedata = {
					file: files[ i ],
					slug: slug( files[ i ].replace(/^.*[\\\/]/, '').split( '.' )[0] ),
					path: site.system.content + files[i],
					meta: metadata,
					raw: content,
					// Generate html after replacing local references to ./assets to blogurl/assets
					html: markdown( String( content ).replace( /\.\/assets/ig, site.system.url + 'assets' ) ),
					// Links array to which category links will be added below
					links: [ site.system.url + site.system.blogslug + '/' + slug( files[ i ].replace(/^.*[\\\/]/, '').split( '.' )[0] ) ]
				}
				// Add category links
				for (let i = filedata.meta.categories.length - 1; i >= 0; i--) {
					// Add category link to parsed element
					filedata.links.push( site.system.url + filedata.meta.categories[i] + '/' + filedata.slug )
					// Add category to the global array to pass it out of the promise later
					if( allcats.indexOf( filedata.meta.categories[i] ) == -1 ) allcats.push( filedata.meta.categories[i] )
				}

				// Push the file data to the array
				parsedfiles.push( filedata )
				// Resolve if parsed files are equal to existing files
				if ( parsedfiles.length == files.length ) resolve( { parsedfiles: parsedfiles, allcats: allcats } )
			} )
		}
	} )
}

module.exports = {
	read: read,
	parse: parse
}