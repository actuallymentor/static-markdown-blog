import get from './ajax'
import site from '../../system/modules/config'
import getparams from './get-params'

class Search {

	constructor( props ) {
		// Set the input field ID
		this.input = props
		// Search speed limit
		this.speedlimit = 300

	}

	// Search function
	search( ) {
		if ( this.searchlimit ) return
		let value = document.getElementById( this.input ).value.toLowerCase()
		this.results = this.posts.filter( post => {
			return ( 
				post.title.toLowerCase().indexOf( value ) != -1 ? true : false ||
				post.desc.toLowerCase().indexOf( value ) != -1 ? true : false
			)
		} )
		// Set limit tracker
		this.searchlimit = true
		this.display( )
	}

	// Search timer
	timesearch( ) {
		setTimeout( this.search.bind( this ), this.speedlimit + 100 )
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
		let getparameter = getparams( 'search' )
		if( getparameter ) searchbar.value = getparameter; searchbar.placeholder = ''
		// Get posts db
		get( site.system.url + 'posts.json' ).then( posts => {
			this.posts = JSON.parse( posts )
			if( getparameter ) this.search( )
		} )
		// Set the handler for the user input
		searchbar.oninput = this.timesearch.bind( this )
		// Reset the search limiter
		setInterval( (  ) => { this.searchlimit = false }, this.speedlimit )
	}

}

export default Search