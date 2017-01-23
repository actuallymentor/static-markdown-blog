console.log( 'Yay' )

// Import the styles
import './styles/styles.scss'

// Import dynamic navbar
import menu from './js/menu'

// Import search functionality
import Search from './js/search'

window.onload = f => {
	const search = new Search( 'searchinput' )
	console.log( 'Loaded' )
	menu( document )

	// Activate searc is this is the search page
	if( document.getElementById( 'search' ) ) search.init( )
}