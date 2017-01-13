console.log( 'Yay' )

// Import the styles
import './styles/styles.scss'

// Import dynamic navbar
import menu from './js/menu'

window.onload = f => {
	console.log( 'Loaded' )
	menu( document ).then( f => { console.log( 'Menu loaded' ) } )
}