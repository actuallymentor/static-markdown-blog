const sandr = ( html, match, suffix ) => {
	return new Promise( ( resolve, reject ) => {
		// Regex match for img tags
		let images = html.match( match )
		let replace = []
		// if none found, resolve
		if ( !images ) resolve( html )
		for ( let image of images ) {
			// Convoluted regex match for the file name, because regex doesn't do "do not match" statements
			let filename = image.match( /(src\w*=\w*["'][\.\w_\-:\\\/&@#\(\)]*[\\\/])([^"^']*)/ )[ 2 ]
			// Only apply for specific file types
			if ( filename.indexOf( 'jpg' ) != -1 || filename.indexOf( 'png' ) != -1 ) {
				let source = image
				// Make the file name into .post and a .jpg because that is how the compression is configured
				let instead = image.replace( filename, filename.split( '.' )[ 0 ] + suffix + '.jpg' )
				replace.push( { source: image, instead: instead } )
			}
		}
		for ( let hit of replace ) {
			html = html.replace( hit.source, hit.instead )
		}
		resolve( html )
	} )
}

const postimages = html => {
	return new Promise( ( resolve, reject ) => {
		sandr( html, /(<\s*img[\w\s="':\-_\\\/\.]*>)/, '.post' ).then( resolve )
	} )
}

const featimage = html => {
	return new Promise( ( resolve, reject ) => {
		let feats = /(<\s*img[\s\w=\"\'\:\\\/\-\_\.]*id[\s\w=\"\'\:\\\/\-\_\.]*feat[\w\s="':\-_\\\/\.]*>)/ig
		sandr( html, feats, '.feat' ).then( resolve )
	} )
}

const thumbimages = html => {
	return new Promise( ( resolve, reject ) => {
		let thumbs = /(<\s*img[\s\w=\"\'\:\\\/\-\_\.]*class[\s\w=\"\'\:\\\/\-\_\.]*thumb[\w\s="':\-_\\\/\.]*>)/ig
		sandr( html, thumbs, '.thumb' ).then( resolve )
	} )
}

const replaceimages = html => {
	return new Promise( ( resolve, reject ) => {
		featimage( html ).then( html => {
			return postimages( html )
		} ).then( html => {
			return thumbimages( html )
		} ).then( html => {
			resolve( html )
		} )
	} )
}

module.exports = replaceimages