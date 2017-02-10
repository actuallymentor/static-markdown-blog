// Import the styles
import styles from './styles/styles.scss'

// Import dynamic navbar
import menu from './js/menu'

// Import search functionality
import Search from './js/search'

window.onload = f => {
	const search = new Search( 'searchinput' )
	const mobilenemu = new menu( document ).init( )

	// Activate searc is this is the search page
	if( document.getElementById( 'search' ) ) search.init( )
}