const fs = require( 'fs' )
const slug = require( __dirname + '/toslug' )
const markdown = require( 'marked' )
const pug = require( 'pug' )
const del = require( 'del' )
const ncp = require( 'ncp' )
const sm = require( 'sitemap' )
const unique = require( __dirname + '/unique' )
const RSS = require( 'rss' )
const sha = require( 'sha1' )

// ///////////////////////////////
// Sitemap config
// ///////////////////////////////

// Sitemap prototype
let Sitemap = function( ) {
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

// Sitemap generator

let publishsitemap = ( site, parsedfiles, sitemap ) => {
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
		sitemap.make( site ).then( links => {
			resolve( { posts: parsedfiles, links: links } )
		} )
	} )
}

// ///////////////////////////////
// RSS generation
// ///////////////////////////////


let publishrss = ( site, parsedfiles ) => {
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


// ///////////////////////////////
// Reading and parsing
// ///////////////////////////////

let read = site => {
	return new Promise( ( resolve, reject ) => {
		fs.readdir( site.system.content, ( err, files ) => {
			if ( err ) throw err
			// Return only the .md files
			let posts = files.filter( element => {
				if ( element.indexOf( '.md' ) != -1 ) return true
				return false
			} )
			resolve( posts )
		} )
	} )
}

let parse = ( site, files ) => {
	return new Promise( ( resolve, reject ) => {
		let parsedfiles = []
		// Read all the files
		for (let i = files.length - 1; i >= 0; i--) {
			// Read files one by one
			fs.readFile( site.system.content + files[i], 'utf8', ( err, data ) => {
				// Get metadata based on the first ocurrence of { and }
				let metadata = JSON.parse( data.substring( data.indexOf( '{' ), data.indexOf( '}' ) + 1 ) )
				// Check ig updated if populated
				metadata.updated = (metadata.updated.length > 0) ? metadata.updated : metadata.published
				// Get the content based on the position of the first ```\n
				let content = data.slice( data.indexOf( '```\n' ) + 4, data.length )

				// Construct the post object
				let filedata = {
					file: files[ i ],
					slug: slug( files[ i ].replace(/^.*[\\\/]/, '').split( '.' )[0] ),
					path: site.system.content + files[i],
					meta: metadata,
					raw: content,
					html: markdown( String( content ).replace( './assets', site.system.url + 'assets' ) ),
					links: [ site.system.url + site.system.blogslug + '/' + slug( files[ i ].replace(/^.*[\\\/]/, '').split( '.' )[0] ) ]
				}				
				// Add category links
				for (let i = filedata.meta.categories.length - 1; i >= 0; i--) {
					filedata.links.push( site.system.url + filedata.meta.categories[i] + '/' + filedata.slug )
				}

				// Push the file data to the array
				parsedfiles.push( filedata )
				// Resolve if parsed files are equal to existing files
				if ( parsedfiles.length == files.length ) resolve( parsedfiles )
			} )
		}
	} )
}

// ///////////////////////////////
// Publishing to files
// ///////////////////////////////

// Publishing posts
let publishpost = ( site, single ) => {
	// Make public folder if it does not exist
	if( !fs.existsSync( site.system.public ) ) fs.mkdirSync( site.system.public )
	return new Promise( ( resolve, reject ) => {
		let processed = {
			cat: 0,
			main: 0
		}
		// Publish in categories
		for (let i = single.meta.categories.length - 1; i >= 0; i--) {
			// Make cat folder if it doesn't exist
			if( !fs.existsSync( site.system.public + single.meta.categories[i] ) ) fs.mkdirSync( site.system.public + single.meta.categories[i] )
			// Generate page
			let page = pug.renderFile( site.system.templates + '/blog.pug', {
				site: site,
				file: single,
				category: single.meta.categories[ 0 ],
				url: site.system.url + single.meta.categories[ 0 ] + '/' + single.slug + '.html'
			} )
			// Write result to file
			fs.writeFile( site.system.public + single.meta.categories[ 0 ] + '/' + single.slug + '.html', page, err => {
				if ( err ) reject( err )
				// Count amount of categories processed
				processed.cat ++
				// Resolve if all have been processed
				if ( processed.cat == single.meta.categories.length && processed.main == 1 ) {
					if (process.env.debug) console.log( 'Promise for publishing completed for main' )
					resolve( single )
				}
			} )
		}
		// Publish to default posts folder
		let page = pug.renderFile( site.system.templates + 'blog.pug', {
			site: site,
			file: single,
			url: site.system.url + site.system.blogslug + '/' + single.slug + '.html'
		} )
		// Make posts folder if it does not exist
		if( !fs.existsSync( site.system.public + site.system.blogslug ) ) fs.mkdirSync( site.system.public + site.system.blogslug )
		// Write result to file
		fs.writeFile( site.system.public + site.system.blogslug + '/' + single.slug + '.html', page, err => {
			if ( err ) reject( err )
			// Count amount of processed articles for main folder, and I just realised that is not very elegant...
			processed.main ++
			// Resolve if all have been processed
			if ( processed.cat == single.meta.categories.length && processed.main == 1 ) {
				if (process.env.debug) console.log( 'Promise for publishing completed for main' )
				resolve( single )
			}
		} )
	} )
}

// Publish all posts
let publishposts = ( site, posts ) => {
	return new Promise( ( resolve, reject ) => {
		let parsed = 0
		for (let i = posts.length - 1; i >= 0; i--) {
			publishpost( site, posts[i]).then( post => {
				parsed ++
				if ( parsed == posts.length ) resolve( posts )
			} )
		}
	} )
}

// Publishing the index
let publishindex = ( site, allposts ) => {
	// Make public folder if it does not exist
	if( !fs.existsSync( site.system.public ) ) fs.mkdirSync( site.system.public )
	return new Promise( ( resolve, reject ) => {
		// Generate page
		let page = pug.renderFile( site.system.templates + 'index.pug', {
			site: site,
			posts: allposts,
			url: site.system.url,
			// Meta structure
			file: {
				meta: {
					title: site.identity.title,
					desc: site.identity.desc,
					featuredimg: site.identity.image,
					published: site.system.today
				}
			}
		} )
		// Write index to disk
		fs.writeFile( site.system.public + 'index.html', page, err => {
			if ( err ) reject( err )
			// Resolve
			resolve( page )
		} )
	} )
}

// Publishing category pages
let publishcats = ( site, posts ) => {
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
			for (let j = posts[i].meta.categories.length - 1; i >= 0; i--) {
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
								featuredimg: site.identity.image
							}
						}
					} )
					// Write the category page to file
					fs.writeFile( site.system.public + 'category/' + posts[i].meta.categories[j] + '.html', page, err => {
						if ( err ) reject( err )
						// track how many files were processed
						processed++
						if( processed == posts.length ) resolve( posts )
					} )
				}
			}
		}
	} )
}

// ///////////////////////////////
// Main controllers
// ///////////////////////////////

let publishall = site => {
	return new Promise( ( resolve, reject ) => {
		// Read all post files
		read( site ).then( files => {
			// Parse the files to objects
			parse( site, files ).then( parsedfiles => {
				Promise.all( [
					// Publish the index page
					publishindex( site, parsedfiles ),
					// Publish the categories
					publishcats( site, parsedfiles ),
					// Publish the posts separately
					publishposts( site, parsedfiles ),
					// Publish the sitemap
					publishsitemap( site, parsedfiles, new Sitemap( ) ),
					// Publish the RSS feed
					publishrss( site, parsedfiles )
					] ).then( ( result ) => {
						console.log( '\nALL DONE\n' )
					} )
				} )
		} )
	} )
}

let copyassets = site => {
	return new Promise( ( resolve, reject ) => {
		// Recursively copy all assets from the source to the public folder
		ncp( site.system.content + '/assets', site.system.public + '/assets', err => {
			if ( err ) reject(  err )
			// Resolve empty
			resolve( )
		} )
	} )
}

let clean = site => {
	return new Promise( ( resolve, reject ) => {
		// Delete old files
		if (process.env.debug) console.log( 'Deleting all previous build files synchronously' )
		// Synchronously delete the old files
		if( fs.existsSync( site.system.public ) ) del.sync( [ site.system.public ] )
		resolve( )
	} )
}


module.exports = {
	publish: publishall,
	clean: clean,
	assets: copyassets
}