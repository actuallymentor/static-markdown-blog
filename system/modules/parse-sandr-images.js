const sandr = ( html, match, suffix ) => {
	// Regex match for img tags
	let images = html.match( match )
	// Array that tracks the replacable instances
	let replace = []
	// if none found, resolve
	if ( !images ) return Promise.resolve( html )
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
	return Promise.resolve( html )
}

const postimages = html => {
	return new Promise( ( resolve, reject ) => {
		// Search for all images, replace all with .post.jpg. the class="thumb" ones are later overwritten. It does not match images with an ID
		sandr( html, /(<\s*img[\w\s="':\-_\\\/\.]*>)/ig, '.post' ).then( resolve ).catch( reject )
	} )
}

const featimage = html => {
	return new Promise( ( resolve, reject ) => {
		// Match all images with id 'feat', so only the featured image from the theme
		let feats = /(<\s*img[\s\w=\"\'\:\\\/\-\_\.]*id[\s\w=\"\'\:\\\/\-\_\.]*feat[\w\s="':\-_\\\/\.]*>)/ig
		sandr( html, feats, '.feat' ).then( resolve ).catch( reject )
	} )
}

const thumbimages = html => {
	return new Promise( ( resolve, reject ) => {
		// Match all images with the class 'thumb', so only thumbnails
		let thumbs = /(<\s*img[\s\w=\"\'\:\\\/\-\_\.]*class[\s\w=\"\'\:\\\/\-\_\.]*thumb[\w\s="':\-_\\\/\.]*>)/ig
		sandr( html, thumbs, '.thumb' ).then( resolve ).catch( reject )
	} )
}

const replaceimages = html => {
	return new Promise( ( resolve, reject ) => {
		// Set all images to .post, this is overwritten by those below, this is why it happens firts
		postimages( html ).then( html => {
			// Set the featured image path
			return featimage( html )
		} ).then( html => {
			// The thumb processing undoes the .post processing for all with class="thumb"
			return thumbimages( html )
		} ).then( html => {
			resolve( html )
		} )
	} )
}

module.exports = replaceimages