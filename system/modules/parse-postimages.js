const postimages = post => {
	return new Promise( ( resolve, reject ) => {
		// Regex match for img tags
		let images = post.html.match( /(<\s*img[\w\s="':\-_\\\/\.]*>)/ )
		let replace = []
		// if none found, resolve
		if ( !images ) resolve( post )
		for ( image of images ) {
			// Convoluted regex match for the file name, because regex doesn't do "do not match" statements
			let filename = image.match( /(src\w*=\w*["'][\w_\-:\\\/&@#\(\)]*[\\\/])([^"^']*)/ )[ 2 ]
			// Only apply for specific file types
			if ( filename.indexOf( 'jpg' ) != -1 || filename.indexOf( 'png' ) != -1 ) {
				let source = image
				// Make the file name into .post and a .jpg because that is how the compression is configured
				let instead = image.replace( filename, filename.split( '.' )[ 0 ] + '.post.jpg' )
				replace.push( { source: image, instead: instead } )
			}
		}
		for ( hit of replace ) {
			post.html = post.html.replace( hit.source, hit.instead )
		}
		resolve( post )
	} )
}

const featimage = post => {
	return new Promise( ( resolve, reject ) => {
		let filename = post.meta.featuredimg.match( /^.*[\\\/](.*)/ )[ 1 ]
		// Only apply for specific file types
		if ( filename.indexOf( 'jpg' ) != -1 || filename.indexOf( 'png' ) != -1 ) {
			post.meta.featuredimg = post.meta.featuredimg.replace( filename, filename.split( '.' )[ 0 ] + '.feat.jpg' )
		}
		resolve( post )
	} )
}

const thumbimages = post => {
	return new Promise( ( resolve, reject ) => {
		// Regex match for img tags
		let images = post.html.match( /(<\s*img.*class.*thumb[\w\s="':\-_\\\/\.]*>)/ )
		let replace = []
		// if none found, resolve
		if ( !images ) resolve( post )
		for ( image of images ) {
			// Convoluted regex match for the file name, because regex doesn't do "do not match" statements
			let filename = image.match( /(src\w*=\w*["'][\.\w_\-:\\\/&@#\(\)]*[\\\/])([^"^']*)/ )[ 2 ]
			// Only apply for specific file types
			if ( filename.indexOf( 'jpg' ) != -1 || filename.indexOf( 'png' ) != -1 ) {
				let source = image
				// Make the file name into .thumb and a .jpg because that is how the compression is configured
				let instead = image.replace( filename, filename.split( '.' )[ 0 ] + '.thumb.jpg' )
				replace.push( { source: image, instead: instead } )
			}
		}
		for ( hit of replace ) {
			post.html = post.html.replace( hit.source, hit.instead )
		}
		resolve( post )
	} )
}

const replaceimages = post => {
	return new Promise( ( resolve, reject ) => {
		featimage( post ).then( post => {
			return postimages( post )
		} ).then( post => {
			return thumbimages( post )
		} ).then( post => {
			resolve( post )
		} )
	} )
}

module.exports = replaceimages