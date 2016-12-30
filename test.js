const bs = require( 'browser-sync' ).create( )
const Broken = require( 'bs-broken-links-checker' ).BrokenLinksChecker
const broken = new Broken( )
const site = require( __dirname + '/system/modules/config' )

// init the browsersync server
bs.init( {
	open: false,
	server: {
		baseDir: './public',
		serveStaticOptions: {
			extensions: ['html']
		}
	}
}, f => {
	broken.start( site.system.url )
})