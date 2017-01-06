// ///////////////////////////////
// RSS generation
// ///////////////////////////////
const fs = require( 'fs' )
const RSS = require( 'rss' )
const sha = require( 'sha1' )

module.exports = ( site, parsedfiles ) => {
	let feed = new RSS( {
		title: site.identity.title,
		description: site.identity.desc,
		feed_url: site.system.url + 'rss.xml',
		site_url: site.system.url,
		image_url: site.system.url + site.identity.image,
		managingEditor: site.author.email + ' (' + site.author.firstname + ' ' + site.author.lastname + ')',
		webMaster: site.author.email + ' (' + site.author.firstname + ' ' + site.author.lastname + ')',
		copyright: site.system.year + ' ' + site.author.firstname + ' ' + site.author.lastname,
		language: site.identity.language
	} )
	return new Promise( ( resolve, reject ) => {
		// Loop over all posts
		for (let i = parsedfiles.length - 1; i >= 0; i--) {
			feed.item( {
				title: parsedfiles[ i ].meta.title,
				description: parsedfiles[ i ].meta.desc,
				url: site.system.url + site.system.blogslug + '/' + parsedfiles[ i ].slug,
				guid: sha( parsedfiles[ i ].title + parsedfiles[ i ].meta.published ),
				categories: parsedfiles[ i ].meta.categories,
				author: site.author.email + ' (' + site.author.firstname + ' ' + site.author.lastname + ')',
				date: site.system.today
			} )
		}
		// Parse feed to xml
		let feedxml = feed.xml( )
		// Write feed
		fs.writeFile( site.system.public + 'rss.xml', feedxml, err => { if ( err ) reject( err ) } )
		resolve( feedxml )
	} )
}