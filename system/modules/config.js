// import modules
const fs = require( 'fs' )

// Configs
let config = {
	title: "Global title",
	desc: "Website description",
	twitter: "@ctuallymentor",
	baseUrl: "https://www.skillcollector.com",
	blogslug: "/post/",
	ga: "UA-XXXXXXXX-XX",
	content: __dirname + '/../../content/',
	public: __dirname + '/../../public/',
	templates: __dirname + '/../templates/'
}

// grab, parse and export the config file
module.exports = config