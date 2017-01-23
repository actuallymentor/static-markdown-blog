import get from './ajax'

class Search {

	constructor( props ) {
		console.log( 'This is the search page' )
		// Set the input field ID
		this.input = props
		// Get posts db
		get( '/posts.json' ).then( posts => {
			this.posts = JSON.parse( posts )
		} )
	}


	// Search function
	search( ) {
		let value = document.getElementById( this.input ).value.toLowerCase()
		this.results = this.posts.filter( post => {
			return ( 
				post.title.toLowerCase().indexOf( value ) != -1 ? true : false ||
				post.desc.toLowerCase().indexOf( value ) != -1 ? true : false
			)

		} )
		this.display( )
	}

	// Display search results
	display( ) {
		let resultdiv = document.getElementById( 'searchresults' )
		let html = ''
		for (let i = this.results.length - 1; i >= 0; i--) {
			html += '<a class="postlist" href="' + this.results[i].url + '"><article><h3>' + this.results[i].title + '</h3><span>' + this.results[i].desc + '</span></article></a>'
		}
		resultdiv.innerHTML = html
	}

	// Initialisation
	init( ) {
		let searchbar = document.getElementById( this.input )
		// Set the handler for the user input
		searchbar.oninput = this.search.bind( this )
	}

}

export default Search