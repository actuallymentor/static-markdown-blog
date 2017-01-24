// ///////////////////////////////
// RSS generation
// ///////////////////////////////
const fs = require( 'fs' )
const RSS = require( 'rss' )
const sha = require( 'sha1' )
const pfs = require( __dirname + '/parse-fs' )
const write = require( __dirname + '/publish-file' )

// ///////////////////////////////
// RSS Feed
// ///////////////////////////////

const makerss = site => {
	return Promise.resolve( new RSS( {
		title: site.identity.title,
		description: site.identity.desc,
		feed_url: site.system.url + 'rss.xml',
		site_url: site.system.url,
		image_url: site.system.url + site.identity.image,
		managingEditor: site.author.email + ' (' + site.author.firstname + ' ' + site.author.lastname + ')',
		webMaster: site.author.email + ' (' + site.author.firstname + ' ' + site.author.lastname + ')',
		copyright: site.system.year + ' ' + site.author.firstname + ' ' + site.author.lastname,
		language: site.identity.language
	} ) )
}

const makefeeditem = ( feed, site, file ) => {
	return Promise.resolve( feed.item( {
		title: file.meta.title,
		description: file.meta.desc,
		url: site.system.url + site.system.blogslug + '/' + file.slug,
		guid: sha( file.title + file.meta.published + file.raw ),
		categories: file.meta.categories,
		author: site.author.email + ' (' + site.author.firstname + ' ' + site.author.lastname + ')',
		date: site.system.today
	} ) )
}

const rss = ( site, parsedfiles ) => {

	return new Promise( ( resolve, reject ) => {
		makerss( site ).then( feed => {
			return Promise.all( parsedfiles.map( file => { return makefeeditem( feed, site, file ) } ) )
		} ).then( feedarray => {
			return feedarray[ feedarray.length - 1 ].xml( )
		} ).then( feedxml => {
			return pfs.mkdir( site.system.public ).then( f => {
				return write( site.system.public + 'rss.xml', feedxml )
			} )
		} ).then( resolve ).catch( reject )

	} )
}

// ///////////////////////////////
// Podcast feed
// ///////////////////////////////

const makepodcastfeed = site => {
	return Promise.resolve( new RSS( {
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
	} ) )
}

const makepodcastitem = ( feed, site, file ) => {
	return Promise.resolve( feed.item( {
		title: file.meta.title,
		description: file.meta.desc,
		url: site.system.url + site.system.blogslug + '/' + file.slug,
		guid: sha( file.title + file.meta.published ),
		categories: file.meta.categories,
		author: site.author.email + ' (' + site.author.firstname + ' ' + site.author.lastname + ')',
		date: site.system.today,
		enclosure: { url: site.system.url + file.meta.audio },
		custom_elements: [
	      { 'itunes:author': site.author.firstname + ' ' + site.author.lastname },
	      { 'itunes:subtitle': file.meta.title },
	      { 'itunes:image': {
	        _attr: {
	          href: file.meta.featuredimg
	        }
	      } },
	      { 'itunes:duration': file.meta.duration }
	    ]
	} ) )
}

const findpodcasts = posts => {
	return posts.filter( post => { return ( post.meta.type == 'podcast' ) } )
}

const podcast = ( site, parsedfiles ) => {

	return new Promise( ( resolve, reject ) => {
		makepodcastfeed( site ).then( feed => {
			let podcasts = findpodcasts( parsedfiles )
			return Promise.all( podcasts.map( file => { return makepodcastitem( feed, site, file ) } ) )
		} )
		.then( feedarray => {
			return feedarray[ feedarray.length - 1 ].xml( )
		} ).then( feedxml => {
			return pfs.mkdir( site.system.public ).then( f => {
				return write( site.system.public + 'podcast.xml', feedxml )
			} )
		} ).then( resolve ).catch( reject )
	} )

}

module.exports = {
	rss: rss,
	podcast: podcast
}