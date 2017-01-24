// ///////////////////////////////
// Publishing category pages
// ///////////////////////////////
const pug = require( __dirname + '/parse-pug' )
const write = require( __dirname + '/publish-file' )
const pfs = require( __dirname + '/parse-fs' )

const allcats = posts => {
	let allcats = []
	for (let i = posts.length - 1; i >= 0; i--) {
		for (let j = posts[i].meta.categories.length - 1; j >= 0; j--) {
			if( allcats.indexOf( posts[i].meta.categories[j] ) == -1 ) allcats.push( posts[i].meta.categories[j] )
		}
	}
	return allcats
}

const findpostswithcat = ( posts, cat ) => {
	return new Promise( ( resolve, reject ) => {
		// Check for existence of cat in this post
		resolve( posts.filter( post => { return ( post.meta.categories.indexOf( cat ) != -1 ) } ) )
	} )
}

const publishcat = ( site, posts, cat ) => {
	return new Promise( ( resolve, reject ) => {
		pug( site.system.templates + 'category.pug', {
			site: site,
			posts: posts,
			category: cat,
			url: site.system.url + cat,
			// Meta structure
			file: {
				meta: {
					title: 'Category: ' + cat,
					desc: site.identity.desc,
					featuredimg: site.identity.image,
					published: site.system.today
				}
			}
		} ).then( result => {
			return write( site.system.public + 'category/' + cat + '.html', result )
		} ).then( resolve ).catch( reject )
	} )
}

const publishallcats = ( site, posts ) => {
	pfs.mkdir( site.system.public + 'category/' ).then( f => {
		return new Promise( ( resolve, reject ) => {
			Promise.resolve( posts )
			.then( allcats )
			.then( categories => {
				return Promise.all( categories.map( category => {
					return findpostswithcat( posts, category ).then( postswithcat => { return publishcat( site, postswithcat, category ) } )
				} ) )
			} )
			.then( resolve ).catch( reject )
		} )
	} )
}

module.exports = publishallcats