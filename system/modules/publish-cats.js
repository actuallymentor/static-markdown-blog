// ///////////////////////////////
// Publishing category pages
// ///////////////////////////////
const fs = require( 'fs' )
const pug = require( 'pug' )

module.exports = ( site, posts ) => {
	// Track processed cats
	let catsdone = []
	let processed = 0
	// Make public folder if it does not exist
	if( !fs.existsSync( site.system.public ) ) fs.mkdirSync( site.system.public )
	// Create category folder if it does not exist
	if( !fs.existsSync( site.system.public + 'category/' ) ) fs.mkdirSync( site.system.public + 'category/' )
	return new Promise( ( resolve, reject ) => {
		// Go through the posts
		for (let i = posts.length - 1; i >= 0; i--) {
			// Go through the categories of individual posts
			for (let j = posts[i].meta.categories.length - 1; j >= 0; j--) {
				if( process.env.test ) console.log( 'Evaluating category ' + posts[i].meta.categories[ j ] + ' of ' + posts[i].meta.categories.length )
				// Check if this cat has been parsed yet
				if ( catsdone.indexOf( posts[i].meta.categories[j] ) == -1 ) {
					// Add cat to array of processed
					catsdone.push( posts[i].meta.categories[j] )
					// Create an array of posts that match cat
					let postswithcat = posts.filter( post => {
						// Check for existence of cat in this post
						return ( post.meta.categories.indexOf( posts[i].meta.categories[j] ) != -1 )
					} )
					// Generate pug for cat page
					let page = pug.renderFile( site.system.templates + 'category.pug', {
						site: site,
						posts: postswithcat,
						category: posts[i].meta.categories[j],
						url: site.system.url + posts[i].meta.categories[j],
						// Meta structure
						file: {
							meta: {
								title: 'Category: ' + posts[i].meta.categories[j],
								desc: site.identity.desc,
								featuredimg: site.identity.image,
								published: site.system.today
							}
						}
					} )
					// Write the category page to file
					fs.writeFile( site.system.public + 'category/' + posts[i].meta.categories[j] + '.html', page, err => {
						if ( err ) reject( err )
						// track how many files were processed
						processed++
						if( process.env.test ) console.log( 'Processed a category' )
						if( processed == posts.length ) resolve( posts )
					} )
				}
			}
		}
	} )
}