// import modules
const fs = require( 'fs' )

// Configs
let config = {
	// All related to the site
	identity: {
		title: "Global title",
		desc: "Website description",
		logo: "" // Add dimensions in the ld+json schema
	},
	// System settings
	system: {
		blogslug: "post",
		content: __dirname + '/../../content/',
		public: __dirname + '/../../public/',
		templates: __dirname + '/../templates/',
		baseURL: "http://localhost:3000/",
		year: new Date().getFullYear()
	},
	// The blog author
	author: {
		firstname: "Mentor",
		lastname: "Palokaj",
		email: "mentor@palokaj.co",
		twitter: "@actuallymentor",
		url: "https://www.skillcollector.com"
	},
	// Tracking codes
	track: {
		ga: "UA-XXXXXXXX-XX"
	}
}

// grab, parse and export the config file
module.exports = config