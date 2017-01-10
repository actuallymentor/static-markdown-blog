module.exports = f => {
	process.on( 'unhandledRejection', ( error, promise ) => {
		console.log( 'UPR: ' + promise + ' with ' + error )
		console.log( error.stack )
	} )
}