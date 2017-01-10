const sharp = require( 'sharp' )
const fs = require( 'fs' )
const site = require( __dirname + '/config' )

const findimages = site => {
	return new Promise( ( resolve, reject ) => {
		fs.readdir( site.system.content + '/assets', ( err, files ) => {
			if ( err ) throw err
			// Return only the image files
			let images = files.filter( element => {
				if ( element.match( /\.jpg|\.png|\.svg/ ) ) return true
				return false
			} )
			resolve( images )
		} )
	} )
}

const optimize = ( site, file ) => {
	// Get the file name from the full file
	let filename = file.replace(/^.*[\\\/]/, '').split( '.' )[0]
	// Construct the sharp module configs for the image sizes
	let config = {
		thumb: sharp( )
		.resize( site.system.images.thumb.w, site.system.images.thumb.h )
		.withoutEnlargement( )
		.jpeg( { quality: site.system.images.quality } ),
		post: sharp( )
		.resize( site.system.images.post.w )
		.withoutEnlargement( )
		.jpeg( { quality: site.system.images.quality } ),
		feat: sharp( )
		.resize( site.system.images.feat.w )
		.withoutEnlargement( )
		.jpeg( { quality: site.system.images.quality } )
	}
	return new Promise( ( resolve, reject ) => {
		let processed = 0
		// Read this particular image
		let image = fs.createReadStream( site.system.content + 'assets/' + file )

		// Create write streams for the different sizes
		let thumb = fs.createWriteStream( site.system.public + 'assets/' + filename + '.thumb.jpg' )
		let post = fs.createWriteStream( site.system.public + 'assets/' + filename + '.post.jpg' )
		let feat = fs.createWriteStream( site.system.public + 'assets/' + filename + '.feat.jpg' )

		// Write all of the images
		image.pipe( config.thumb ).pipe( thumb )
		image.pipe( config.post ).pipe( post )
		image.pipe( config.feat ).pipe( feat )

		// Resolve when the read stream is done
		thumb.on( 'close', f => { if ( processed++ && processed == 3 ) resolve( ) } )
		post.on( 'close', f => { if ( processed++ && processed == 3 ) resolve( ) } )
		feat.on( 'close', f => { if ( processed++ && processed == 3 ) resolve( ) } )
	} )
}

const optimizeall = site => {
	if( !fs.existsSync( site.system.public + 'assets' ) ) fs.mkdirSync( site.system.public + 'assets' )
	return new Promise( ( resolve, reject ) => {
		findimages( site ).then( files => {
			return Promise.all[
				files.map( file => { return optimize( site, file ) } )
			]
		} ).then( resolve )
	} )
}


module.exports = optimizeall