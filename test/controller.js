// Get polyfill so we can use full ES6 in the tests
import 'babel-polyfill'

// Get the expect functionality
import { expect } from 'chai'

// Get controller & config
const blog = require( __dirname + '/../system/modules/controller' )
const site = require( __dirname + '/../system/modules/config' )

// File system
const fs = require( 'fs' )
const del = require( 'del' )

// ///////////////////////////////
// Cleaning functionality
// ///////////////////////////////

describe( 'Cleaner', f => {
	it( 'Deletes the old build', done => {
		// Publish the blog so we have some content
		blog.publish.posts( site ).then( f => {
			blog.clean( site ).then( f => {
				fs.readdir( site.system.public, ( err, files ) => {
					expect( files.length ).to.equal( 0 )
					done( )
				} )
			} )
		} )
	} )
} )

// ///////////////////////////////
// Make new post
// ///////////////////////////////

describe( 'Post generator', f => {
	it( 'Generates new files', done => {
		// Geneerate new blog file
		blog.makepost( site ).then( f => {
			// Check for newpost file
			fs.readFile( site.system.content + 'NEWPOST.md', ( err, data ) => {
				expect( err ).to.equal( null )
				expect( data ).to.not.equal( null )
				// Check for meta file
				fs.readFile( site.system.content + 'NEWPOST.md.json', ( err, data ) => {
					expect( err ).to.equal( null )
					expect( data ).to.not.equal( null )
					// Detele test files
					del.sync( [ site.system.content + 'NEWPOST.md' ] )
					del.sync( [ site.system.content + 'NEWPOST.md.json' ] )
					done( )
				} )
			} )
		} )
	} )
} )

// ///////////////////////////////
// Publish posts
// ///////////////////////////////

describe( 'Post publish controller', f => {
	// Main filder publish
	it( 'Publishes the right number of posts', done => {
		// Publish posts after cleaning
		blog.clean( site ).then( f => {
			blog.publish.posts( site ).then( data => {
				// Read the public folder
				fs.readdir( site.system.public + site.system.blogslug, ( err, published ) => {
					if ( err ) throw err
					let posts = published.filter( element => {
						if ( element.indexOf( '.html' ) != -1 ) return true
							return false
					} )
					expect( posts.length ).to.equal( data.files.length )
					done( )
				} )
			} )
		} )
	} )
	// // Category publis
	// it( 'Publishes to categories', done => {
	// 	// Publish posts after cleaning
	// 	blog.clean( site ).then( f => {
	// 		blog.publish.posts( site ).then( data => {
	// 			// TODO
	// 			done( )
	// 		} )
	// 	} )
	// } )
} )

// ///////////////////////////////
// Publish index
// ///////////////////////////////

describe( 'Index controller', f => {
	it( 'publishes the index', done => {
		// Clean the public folder and publish ethe index
		blog.clean( site ).then( f => {
			blog.publish.index( site ).then( html => {
				fs.readFile( site.system.public + 'index.html', ( err, data ) => {
					expect( err ).to.equal( null )
					expect( data ).to.not.equal( null )
					// Check for some common tags
					expect( html.indexOf( '<html>' ) ).not.to.equal( -1 )
					expect( html.indexOf( '<head>' ) ).not.to.equal( -1 )
					expect( html.indexOf( '<title>' ) ).not.to.equal( -1 )
					expect( html.indexOf( '<body>' ) ).not.to.equal( -1 )
					done( )
				} )
			} )
		} )
	} )
} )