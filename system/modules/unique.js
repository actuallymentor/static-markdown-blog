module.exports = array => {

    let prims = { "boolean":{} , "number": {}, "string": {} }, objs = [ ]

    return array.filter( item => {
        let itemtype = typeof item
        if( itemtype in prims )
            return prims[ itemtype ].hasOwnProperty(item) ? false : ( prims[ itemtype ][ item ] = true )
        else
            return objs.indexOf( item ) >= 0 ? false : objs.push( item )
    } )
}