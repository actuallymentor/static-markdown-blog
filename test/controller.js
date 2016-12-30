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

// ///////////////////////////////
// Cleaning functionality
// ///////////////////////////////

describe( 'Cleaner module', f => {
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

describe( 'Assets module', f => {
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

describe( 'Publishing module', f => {

	it( 'Publishes single posts correctly', done => {
		blog.clean( site ).then(  f => {
			blog.publish( site ).then( blog => {
				// Check if number of public files equals parsed files
				fs.readdir( site.system.public + site.system.blogslug, ( err, files ) => {
					expect( files.length ).to.equal( blog.posts.length )
					done( )
				} )
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

describe( 'Links in the blog', f => {

	// Clickable links
	it( 'Clickable are working', done => {
		// Set up the link checker
		let broken = []
		let checker = new blc.HtmlUrlChecker( { filterLevel: 0 }, {
			link: (result, customData) => {
				if ( result.broken ) broken.push( { link: result.url.original, source: result.base.original } )
			},
			end: function(){
				if ( broken.length > 0 ) console.log( broken )
				expect( broken.length ).to.equal( 0 )
				done( )
			}
		} )
		// init the browsersync server
		bs.init( {
			open: false,
			server: {
				baseDir: './public',
				serveStaticOptions: {
					extensions: ['html']
				}
			},
			logLevel: "silent"
		}, f => {
			blog.publish( site ).then( blog => {
				for (var i = blog.links.length - 1; i >= 0; i--) {
					checker.enqueue( blog.links[i] )
				}
			} )
		} )
	} )


	// Clickable links
	it( 'All resources & meta are working', done => {
		// Set up the link checker
		let broken = []
		let checker = new blc.HtmlUrlChecker( { filterLevel: 3 }, {
			link: (result, customData) => {
				if ( result.broken ) broken.push( { link: result.url.original, source: result.base.original } )
			},
			end: function(){
				if ( broken.length > 0 ) console.log( broken )
				expect( broken.length ).to.equal( 0 )
				done( )
			}
		} )
		// init the browsersync server
		bs.init( {
			open: false,
			server: {
				baseDir: './public',
				serveStaticOptions: {
					extensions: ['html']
				}
			},
			logLevel: "silent"
		}, f => {
			blog.publish( site ).then( blog => {
				for (var i = blog.links.length - 1; i >= 0; i--) {
					checker.enqueue( blog.links[i] )
				}
			} )
		} )
	} )

} )