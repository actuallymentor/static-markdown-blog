class menu {

	constructor( props ) {
		this.dom = props
	}

	init( ) {
		this.menubutton = this.dom.getElementById( 'menu-btn' )
		this.menubutton.onclick = event => {
			this.dom.getElementById( 'navbar' ).classList.toggle( 'mobile' )
		}
	}


}

export default menu