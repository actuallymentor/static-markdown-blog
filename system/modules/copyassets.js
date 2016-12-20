const ncp = require( 'ncp' )
const site = require( __dirname + '/config' )

let copyassets = f => {
	return new Promise( ( resolve, reject ) => {
		ncp( site.system.content + '/assets', site.system.public + '/assets', err => {
			if ( err ) reject(  err )
			resolve( )
		} )
	} )
}

module.exports = copyassets