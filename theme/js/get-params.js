const getparams = (name, url) => {
    if (!url) url = window.location.href
    name = name.replace(/[\[\]]/g, "\\$&")
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)")
    let results = regex.exec(url)
    if ( !results ) return null
    if ( !results[2] ) return ''
    return decodeURIComponent( results[2].replace( /\+/g, " " ) )
}

export default getparams