const fs = require( 'fs' )
const slug = require( __dirname + '/toslug' )

let readposts = folder => {
	return new Promise( ( resolve, reject ) => {
		fs.readdir( folder, ( err, files ) => {
			if ( err ) throw err
				let posts = files.filter( element => {
					if ( element.indexOf( '.md' ) != -1 && element.indexOf( '.md.json' ) == -1 ) return true
						return false
				} )
			resolve( posts )
		} )
	} )
}

let readmetafiles = folder => {
	return new Promise( ( resolve, reject ) => {
		fs.readdir( folder, ( err, files ) => {
			if ( err ) throw err
				let posts = files.filter( element => {
					if ( element.indexOf( '.md.json' ) != -1 ) return true
						return false
				} )
			resolve( posts )
		} )
	} )
}

let parseMeta = ( path, file ) => {
	return new Promise( ( resolve, reject ) => {
		fs.readFile( path + file, ( err, data ) => {
			let metafile = JSON.parse( data )
			metafile.configfile = file
			metafile.slug = slug( metafile.title )
			resolve( metafile )
		} )
	} )
}

let readmeta = function( site ) {
	return new Promise( ( resolve, reject ) => {
		let allmeta = []
		let parsed = 0
		// Read all the metadata files
		readmetafiles( site.system.content ).then( metafiles => {
			// Loop over the meta files
			for (var i = metafiles.length - 1; i >= 0; i--) {
				// Read the file and JSON parse it
				parseMeta( site.system.content, metafiles[ i ] ).then( postobject => {
					// Send the json data to the array
					allmeta.push( postobject )
					parsed ++
					// Resolve if we parsed all
					if ( parsed == metafiles.length ) resolve( allmeta )
				} )
			}
		} )
	} )
}

module.exports = {
	posts: readposts,
	meta: readmeta
}