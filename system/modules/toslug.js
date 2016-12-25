// Prettify and remove
let slug = input => {
	input = input.replace( /\s/g, '-' ).toLowerCase( )
	input = input.replace( /&/g, 'and' )
	input = input.replace( /[^a-zA-Z0-9-_]+/ig, '' )
	return input
}

module.exports = slug