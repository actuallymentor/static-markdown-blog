// ///////////////////////////////
// Sitemap generator
// ///////////////////////////////
const sm = require( 'sitemap' )
const fs = require( 'fs' )
const unique = require( __dirname + '/unique' )

// Sitemap prototype
let proto = function( ) {
	this.links = []
	this.add = newlink => {
		this.links.push( newlink )
	}
	this.make = ( site ) => {
		return new Promise( ( resolve, reject ) => {
			let themap = sm.createSitemap( {
				hostname: site.system.url,
				urls: this.links
			} )
			themap.toXML( ( err, xml ) => {
				if ( err ) reject( err )
					fs.writeFile( site.system.public + 'sitemap.xml', xml, err => {
						if ( err ) reject( err )
						resolve( unique( this.links ) )
					} )
			} )
		} )
	}
}

let make = ( site, parsedfiles, sitemap, dry = false ) => {
	return new Promise( ( resolve, reject ) => {
		// Add links to sitemap
		// Add the index
		sitemap.add( site.system.url )
		// Loop over the posts to add all category links
		for (let i = parsedfiles.length - 1; i >= 0; i--) {
			// Add all post links to sitemap
			for (let j = parsedfiles[i].links.length - 1; j >= 0; j--) {
				sitemap.add( parsedfiles[i].links[ j ] )
			}
			// Add all category links to sitemap
			for (let k = parsedfiles[i].meta.categories.length - 1; k >= 0; k--) {
				if( sitemap.links.indexOf( site.system.url + 'category/' + parsedfiles[i].meta.categories ) == -1 )
					sitemap.add( site.system.url + 'category/' + parsedfiles[i].meta.categories )
			}
		}
		// Return links only if this is a dry run ( for testing )
		if ( dry ) resolve( sitemap.links )
		// Return a full sitemap if we're not dry, which is the default
		sitemap.make( site ).then( links => {
			resolve( { posts: parsedfiles, links: links } )
		} ).catch( err => { throw err } )
	} )
}

module.exports = {
	proto: proto,
	make: make
}