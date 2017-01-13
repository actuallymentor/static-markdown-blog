const menu = dom => {
	return new Promise( ( resolve, reject ) => {
		// Grab the menu button
		let menubutton = dom.getElementById( 'menu-btn' )
		// Add click listener
		menubutton.onclick = event => {
			// Toggle mobile class on click
			dom.getElementById( 'navbar' ).classList.toggle( 'mobile' )
		}
		resolve( )
	} )
}

export default menu