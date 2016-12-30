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
			blog.publish( site ).then( posts => {
				// Check if number of public files equals parsed files
				fs.readdir( site.system.public + site.system.blogslug, ( err, files ) => {
					expect( files.length ).to.equal( posts.length )
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