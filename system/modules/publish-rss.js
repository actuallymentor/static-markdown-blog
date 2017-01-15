// ///////////////////////////////
// RSS generation
// ///////////////////////////////
const fs = require( 'fs' )
const RSS = require( 'rss' )
const sha = require( 'sha1' )

let rss = ( site, parsedfiles ) => {
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
		fs.writeFile( site.system.public + 'rss.xml', feedxml, err => { if ( err ) return reject( err ) } )
		resolve( feedxml )
	} )
}

let podcast = ( site, parsedfiles ) => {
	// Set podcast feed data
	let feed = new RSS( {
		title: site.identity.title,
		description: site.identity.desc,
		feed_url: site.system.url + 'rss.xml',
		site_url: site.system.url,
		image_url: site.system.url + site.identity.image,
		managingEditor: site.author.email + ' (' + site.author.firstname + ' ' + site.author.lastname + ')',
		webMaster: site.author.email + ' (' + site.author.firstname + ' ' + site.author.lastname + ')',
		copyright: site.system.year + ' ' + site.author.firstname + ' ' + site.author.lastname,
		language: site.identity.language,
		custom_namespaces: {
			'itunes': 'http://www.itunes.com/dtds/podcast-1.0.dtd'
		},
		custom_elements: [
			{ 'itunes:explicit': 'clean' },
			{ 'itunes:subtitle': site.identity.desc },
			{ 'itunes:author': site.author.firstname + ' ' + site.author.lastname },
			{ 'itunes:summary': site.identity.desc },
			{ 'itunes:owner': [
				{ 'itunes:name': site.author.firstname + ' ' + site.author.lastname },
				{ 'itunes:email': site.author.email }
			] },
			{ 'itunes:image': {
				_attr: {
					href: site.system.url + site.podcast.image
				}
			} },
			{ 'itunes:category': [
			{_attr: {
				text: 'Education'
			} },
			{ 'itunes:category': {
				_attr: {
					text: 'Technology'
				}
			} },
			{ 'itunes:category': {
				_attr: {
					text: 'Business'
				}
			} }
			] }
		]
	} )
	// Return generation promise
	return new Promise( ( resolve, reject ) => {
		// Loop over all posts
		for (let i = parsedfiles.length - 1; i >= 0; i--) {
			if ( parsedfiles[ i ].meta.categories.indexOf( 'podcasts' ) != -1 ) { 
				feed.item( {
					title: parsedfiles[ i ].meta.title,
					description: parsedfiles[ i ].meta.desc,
					url: site.system.url + site.system.blogslug + '/' + parsedfiles[ i ].slug,
					guid: sha( parsedfiles[ i ].title + parsedfiles[ i ].meta.published ),
					categories: parsedfiles[ i ].meta.categories,
					author: site.author.email + ' (' + site.author.firstname + ' ' + site.author.lastname + ')',
					date: site.system.today,
					enclosure: { url: site.system.url + parsedfiles[ i ].meta.audio },
					custom_elements: [
				      { 'itunes:author': site.author.firstname + ' ' + site.author.lastname },
				      { 'itunes:subtitle': parsedfiles[ i ].meta.title },
				      { 'itunes:image': {
				        _attr: {
				          href: parsedfiles[ i ].meta.featuredimg
				        }
				      } },
				      { 'itunes:duration': parsedfiles[ i ].meta.duration }
				    ]
				} )
			 }
		}
		// Parse feed to xml
		let feedxml = feed.xml( )
		// Write feed
		fs.writeFile( site.system.public + 'podcast.xml', feedxml, err => { if ( err ) return reject( err ) } )
		resolve( feedxml )
	} )

}

module.exports = {
	rss: rss,
	podcast: podcast
}