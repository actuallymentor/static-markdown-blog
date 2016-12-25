// Get polyfill so we can use full ES6 in the tests
import 'babel-polyfill'

// Get the expect functionality
import { expect } from 'chai'

// ///////////////////////////////
// Compile markdown to html
// ///////////////////////////////

const md = require( __dirname + '/../system/modules/compilemd' )

describe( 'Markdown compiler', f => {
	it( 'Renders basic html', done => {
		md( __dirname + '/assets/post.md' ).then( html => {
			// Renders headings
			expect( html.indexOf( '<h1 id="i-am-an-article-woo-">I am an article woo!</h1>' ) ).not.to.equal( -1 )
			// Renders list
			expect( html.indexOf( '<li>Basic</li>' ) ).not.to.equal( -1 )
			// Renders code block
			expect( html.indexOf( '<pre><code class="lang-javascript">' ) ).not.to.equal( -1 )
			// Renders blockquote
			expect( html.indexOf( '<blockquote>' ) ).not.to.equal( -1 )
			// Renders table
			expect( html.indexOf( '<table>' ) ).not.to.equal( -1 )
			done( )
		} )
	} )
} )

// ///////////////////////////////
// Compile pug to html
// ///////////////////////////////

const pug = require( __dirname + '/../system/modules/compilepug' )

describe( 'Pug compiler', f => {
	it( 'Compiles pug with locals', done => {
		pug( __dirname + '/assets/post.pug', {
			title: 'Amazing title',
			content: 'Totally good content' 
		}, '/dev/null' ).then( html => {
			expect( html.indexOf( '<title>Amazing title</title>' ) ).not.to.equal( -1 )
			expect( html.indexOf( '<article>Totally good content</article>' ) ).not.to.equal( -1 )
			done( )
		} )
	} )
} )