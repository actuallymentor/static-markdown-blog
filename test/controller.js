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

const maxtimeout = 100000

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
let linkchecker = ( done, level = 0 ) => {
	let broken = []
	return new blc.HtmlUrlChecker( { filterLevel: level, excludedKeywords: [ 'fonts.googleapis.com' ] }, {
		link: ( result, customData ) => {
			if ( result.broken ) broken.push( { link: result.url.original, source: result.base.original } )
			if ( process.env.debug ) console.log( 'Checked link ' + result.url.original )
		},
		page: (error, pageUrl, customData) => {
			if ( error ) console.log( error )
			if ( process.env.debug ) console.log( 'Checked page ' + pageUrl )
		},
		end: f => {
			if ( broken.length > 0 ) console.log( broken )
			expect( broken.length ).to.equal( 0 )
			done( )
		}
	} )
}
let checklinks = ( loglevel, done ) => {
	bs.init(
		{ open: false,
			server: {
				baseDir: site.system.public,
				serveStaticOptions: {
					extensions: ['html']
				}
			},
			logLevel: "silent"
		}, f => {
			// Build frontend app file
			webpack( require( __dirname + '/../webpack.config.js' ), ( err, stats ) => {
				if ( err ) console.log( err )
				fileman.read( site ).then( files => {
					return Promise.all( [
						fileman.parseposts( site, files ),
						fileman.parsepages( site, files ),
						fileman.parseall( site, files )
						] )
				} ).then( content => {
					//Add categories to site variable ( this is local )
					site.cats = content[ 0 ].allcats
					return sitemap.make( site, content[ 0 ].parsedfiles, content[ 1 ].allcats, content[ 1 ].parsedfiles )
				} ).then( links => {
					if( process.env.debug ) console.log( links.urls )
					// Set up the link checker
				let checker = linkchecker( done, loglevel )
				for (let i = links.urls.length - 1; i >= 0; i--) {
					checker.enqueue( links.urls[i] )
				}
				return checker
			} )
		} )
	} )
}

// Set the environment to production
describe( 'Links in the blog', function( ) {


	// Set the timeouts high so that all links can be checked without many or slow requests crashing the test
	this.timeout( maxtimeout )

	// Clickable links
	it( 'Clickable are working', done => {
		checklinks( 0, done )
	} )


	// All links links
	it( 'All resources & meta are working', done => {
		// init the browsersync server
		checklinks( 3, done )
	} )

} )