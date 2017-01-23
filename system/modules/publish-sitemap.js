// ///////////////////////////////
// Sitemap generator
// ///////////////////////////////

const sm = require( 'sitemap' )
const fs = require( 'fs' )
const unique = require( __dirname + '/unique' )
const pfs = require( __dirname + '/parse-fs' )
const write = require( __dirname + '/publish-file' )

const makesitemap = ( site, links ) => {
	return Promise.resolve( sm.createSitemap( {
		hostname: site.system.url,
		urls: links
	} ) )
}

const generatelinks = ( site, parsedfiles, allcats, pages ) => {
	let alllinks = []
	for (let i = parsedfiles.length - 1; i >= 0; i--) {
		for (let j = parsedfiles[i].links.length - 1; j >= 0; j--) {
			alllinks.push( parsedfiles[i].links[j] )
		}
	}
	for (let i = allcats.length - 1; i >= 0; i--) {
		alllinks.push( site.system.url + 'category/' + allcats[ i ] )
	}
	for (let i = pages.length - 1; i >= 0; i--) {
		alllinks.push( site.system.url + site.system.pageslug + '/' + pages[i].slug )
	}
	return Promise.resolve( alllinks )
}

const make = ( site, parsedfiles, allcats, pages ) => {
	return new Promise( ( resolve, reject ) => {
		pfs.mkdir( site.system.public ).then( f => {
			return generatelinks( site, parsedfiles, allcats, pages )
		} ).then( links => {
			return makesitemap( site, links )
		} ).then( sitemap => {
			return write( site.system.public + 'sitemap.xml', sitemap )
		} ).then( resolve ).catch( reject )
	} )
}

module.exports = {
	make: make
}