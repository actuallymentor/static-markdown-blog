const fs = require( 'fs' )

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

let readmeta = folder => {
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

module.exports = {
	posts: readposts,
	meta: readmeta
}