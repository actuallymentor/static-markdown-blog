const sharp = require( 'sharp' )
const fs = require( 'fs' )
const site = require( __dirname + '/config' )
const pfs = require( __dirname + '/parse-fs' )
const path = require( 'path' )

// Find all images in the /assets folder. NOT RECURSIVE.
const findimages = site => {

	// Filter out compressable images
	let filterimg = files => {
		return files.filter( element => {
			return element.match( /\.jpg|\.png/ ) ? true : false
		} )
	}

	return new Promise( ( resolve, reject ) => {
		pfs.readdir( site.system.content + '/assets' ).then( filterimg ).then( resolve ).catch( reject )
	} )

}

// Image optimization ( compression )
const optimize = ( site, filepath ) => {
	// Get the file name from the full file
	let filename = filepath.replace( /.*assets[\/\\]/ig, '').split( '.' )[0]
	// Sharp config generator
	let sharpie = ( site, size ) => { 
		return sharp( )
		.resize( site.system.images[size].w, site.system.images[size].h || undefined )
		.withoutEnlargement( )
		.jpeg( { quality: site.system.images.quality } )
	}
	// Construct the sharp module configs for the image sizes
	let config = {
		thumb: sharpie( site, 'thumb' ),
		post: sharpie( site, 'post' ),
		feat: sharpie( site, 'feat' )
	}
	// Promisify streams
	const stream = ( readstream, writepath, transform ) => {
		return new Promise( ( resolve, reject ) => {

			// Make the write stream
			let write = fs.createWriteStream( writepath )

			// Enable the writing pipe
			readstream.pipe( transform ).pipe( write )
			write.on( 'close', resolve )
			write.on( 'error', reject )

		} )
	}
	return new Promise( ( resolve, reject ) => {

		// Read this particular image
		let image = fs.createReadStream( filepath )
		
		// Check if folder exists
		pfs.mkdir( site.system.public + 'assets/' + filepath.match( /[\\\/\w\-\d]*\//i )[ 0 ].replace( /.*assets[\/\\]/ig, '') ).then( f => {
			// Write all of the images
			return Promise.all( [
				stream( image, site.system.public + 'assets/' + filename + '.thumb.jpg', config.thumb ).catch( console.log.bind( console ) ),
				stream( image, site.system.public + 'assets/' + filename + '.post.jpg', config.post ).catch( console.log.bind( console ) ),
				stream( image, site.system.public + 'assets/' + filename + '.feat.jpg', config.feat ).catch( console.log.bind( console ) )
			] )
		} ).then( resolve ).catch( reject )
	} )
}

const optimizeall = site => {
	// Check if the asset folder exists
	return new Promise( ( resolve, reject ) => {
		if ( process.env.debug ) console.log( 'Optimizing img' )
		// Check for folder and grab all images
		pfs.mkdir( site.system.public + 'assets' ).then( f => {
			return findimages( site )
		} ).then( files => {
			// Call the optimize module on all images separately
			return Promise.all(
				files.map( file => { return optimize( site, file ) } )
			 )
		} ).then( resolve )
	} )
}


module.exports = optimizeall