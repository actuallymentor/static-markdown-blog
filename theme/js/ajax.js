const get = url => {
	return new Promise( ( resolve, reject ) => {
		let xhr = new XMLHttpRequest( )
		xhr.open('GET', url)
		xhr.onload = f => {
			if ( xhr.status == 200 ) return resolve( xhr.responseText )
			reject( )
		}
		xhr.send( )
	} )
	
}

export default get