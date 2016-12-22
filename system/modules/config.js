// import modules
const fs = require( 'fs' )

// Configs
let config = {
	identity: {
		title: "Global title",
		desc: "Website description",
		logo: "" // Add dimensions in the ld+json schema
	},
	system: {
		blogslug: "post",
		content: __dirname + '/../../content/',
		public: __dirname + '/../../public/',
		templates: __dirname + '/../templates/',
		baseURL: "https://www.skillcollector.com",
		year: new Date().getFullYear()
	},
	author: {
		firstname: "Mentor",
		lastname: "Palokaj",
		email: "mentor@palokaj.co",
		twitter: "@actuallymentor",
		url: "https://www.skillcollector.com"
	},
	track: {
		ga: "UA-XXXXXXXX-XX"
	}
}

// grab, parse and export the config file
module.exports = config