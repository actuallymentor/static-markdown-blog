// Get polyfill so we can use full ES6 in the tests
import 'babel-polyfill'

// Get the expect functionality
import { expect } from 'chai'

// Get controller & config
const blog = require( __dirname + '/../system/modules/publisher' )
const site = require( __dirname + '/../system/modules/config' )

// File system
const fs = require( 'fs' )
const del = require( 'del' )
const walk = require( 'recursive-readdir' )

const maxtimeout = 120000

// ///////////////////////////////
// Cleaning functionality
// ///////////////////////////////

describe( 'Cleaner module', function( ) {
	// Increase the allowed timeout drastically
	this.timeout( maxtimeout )

	it( 'Deletes the old build', done => {
		// Publish the blog so we have some content
		blog.publish( site ).then( f => {
			blog.clean( site ).then( f => {
				fs.readdir( site.system.public, ( err, files ) => {
					expect( files ).to.equal( undefined )
					done( )
				} )
			} )
		} )
	} )
} )

// ///////////////////////////////
// Assets
// ///////////////////////////////

describe( 'Assets module', function( ) {
	// Increase the allowed timeout drastically
	this.timeout( maxtimeout )
	
	it( 'Copies all assets', done => {
		blog.clean( site ).then( f => {
			blog.publish( site ).then( f => {
				blog.assets( site ).then( f => {
					walk( site.system.public + 'assets', ( err, originalfiles ) => {
						walk( site.system.public + 'assets', ( err, publicfiles ) => {
							expect( originalfiles.length ).to.equal( publicfiles.length )
							blog.clean( site )
							done( )
						} )
					} )
				} )
			} )
		} )
	} )
} )

// ///////////////////////////////
// Publisher
// ///////////////////////////////

const feed = require( __dirname + '/../system/modules/publish-rss' )
const publishposts = require( __dirname + '/../system/modules/publish-posts' )
const publishcats = require( __dirname + '/../system/modules/publish-cats' )
const sitemap = require( __dirname + '/../system/modules/publish-sitemap' )
const fileman = require( __dirname + '/../system/modules/parse-files' )
const publishindex = require( __dirname + '/../system/modules/publish-index' )
const publishsearch = require( __dirname + '/../system/modules/publish-search' )
const optimizeimages = require( __dirname + '/../system/modules/parse-images' )
const copyassets = require( __dirname + '/../system/modules/parse-assets' )

describe( 'Publishing module', function( ) {
	// Increase the allowed timeout drastically
	this.timeout( maxtimeout )
	

	it( 'Publishes single posts correctly', done => {
		blog.clean( site ).then(  f => {
			return fileman.read( site )
		} ).then( files => {
			return Promise.all( [
				fileman.parseposts( site, files ),
				fileman.parsepages( site, files ),
				fileman.parseall( site, files )
			] )
		} ).then( content => {
			//Add categories to site variable ( this is local )
			site.cats = content[ 0 ].allcats
			// Publish the posts
			return publishposts( site, content[ 0 ].parsedfiles, content[ 1 ].parsedfiles )
		} ).then( result => {
			// Check if number of public files equals parsed files
			fs.readdir( site.system.public + site.system.blogslug, ( err, files ) => {
				expect( files.length ).to.equal( result.length )
				done( )
			} )
		} )
	} )

	it( 'Publishes the index', done => {
		blog.clean( site ).then( f => {
			blog.publish( site ).then( f => {
				fs.readFile( site.system.public + 'index.html', ( err, data ) => {
					expect( err ).to.equal( null )
					expect( data ).to.not.equal( null )
					// Check for some common tags
					expect( data.indexOf( '<html>' ) ).not.to.equal( -1 )
					expect( data.indexOf( '<head>' ) ).not.to.equal( -1 )
					expect( data.indexOf( '<title>' ) ).not.to.equal( -1 )
					expect( data.indexOf( '<body>' ) ).not.to.equal( -1 )
					done( )
				} )
			} )
		} )
	} )

	it( 'Publishes the sitemap', done => {
		blog.clean( site ).then( f => {
			blog.publish( site ).then( f => {
				// Check if aitemap was published
				fs.readFile( site.system.public + 'sitemap.xml', ( err, data ) => {
					expect( err ).to.equal( null )
					expect( data ).to.not.equal( null )
					// Check for some common tags
					expect( data.indexOf( 'xml' ) ).not.to.equal( -1 )
					expect( data.indexOf( 'urlset' ) ).not.to.equal( -1 )
					expect( data.indexOf( '<url>' ) ).not.to.equal( -1 )
					expect( data.indexOf( '<loc>' ) ).not.to.equal( -1 )
					done( )
				} )
			} )
		} )
	} )

} )

// ///////////////////////////////
// Broken link check
// ///////////////////////////////


const bs = require( 'browser-sync' ).create( )
const blc = require( 'broken-link-checker' )
const webpack = require( 'webpack' )
let linkchecker = done => {
	let broken = []
	return new blc.HtmlUrlChecker( { filterLevel: 0 }, {
		link: ( result, customData ) => {
			if ( result.broken ) broken.push( { link: result.url.original, source: result.base.original } )
		},
		end: f => {
			if ( broken.length > 0 ) console.log( broken )
			expect( broken.length ).to.equal( 0 )
			done( )
		}
	} )
}
let bsconfig = {
	open: false,
	server: {
		baseDir: './public',
		serveStaticOptions: {
			extensions: ['html']
		}
	},
	logLevel: "silent"
}

// Set the environment to production
process.env.NODE_ENV = 'production'

describe( 'Links in the blog', function( ) {

	// Don't reprocess all images for this test
	process.env.dev = true

	// Set the timeouts high so that all links can be checked without many or slow requests crashing the test
	this.timeout( maxtimeout )

	// Clickable links
	it( 'Clickable are working', done => {
		// Set up the link checker
		let checker = linkchecker( done )
		// init the browsersync server
		bs.init( bsconfig, f => {
			// Build frontend app file
			webpack( require( __dirname + '/../webpack.config.js' ), ( err, stats ) => {
				if ( err ) console.log( err )
				// Read all posts and construct a sitemap from them
				fileman.read( site ).then( files => {
					// Parse the files to objects
					fileman.parse( site, files ).then( parsedfiles => {
						sitemap.make( site, parsedfiles, new sitemap.proto( ), true ).then( links => {
							for (var i = links.length - 1; i >= 0; i--) {
								checker.enqueue( links[i] )
							}
						} )
					} )
				} )
			} )
		} )
	} )


	// Clickable links
	it( 'All resources & meta are working', done => {
		// Increase the max timeout for this test to buffer for network speed differences
		// Set up the link checker
		let checker = linkchecker( done )
		// init the browsersync server
		bs.init( bsconfig, f => {
			// Build frontend app file
			webpack( require( __dirname + '/../webpack.config.js' ), ( err, stats ) => {
				if ( err ) console.log( err )
				// Read all posts and construct a sitemap from them
				fileman.read( site ).then( files => {
					// Parse the files to objects
					fileman.parse( site, files ).then( parsedfiles => {
						sitemap.make( site, parsedfiles, new sitemap.proto( ), true ).then( links => {
							for (var i = links.length - 1; i >= 0; i--) {
								checker.enqueue( links[i] )
							}
						} )
					} )
				} )
			} )
		} )
	})

} )