// import modules
const fs = require( 'fs' )
const today = require( __dirname + '/today' )
const path = require( 'path' )

// Configs
let config = {
	// All related to the site
	identity: {
		title: "Global title",
		desc: "Website description",
		logo: "assets/logo.svg", // Add dimensions in the ld+json schema
		image: "assets/image.svg"// For sharing. Add dimensions in the ld+json schema
	},
	// System settings
	system: {
		blogslug: "post",
		content: path.normalize( __dirname + '/../../content/' ),
		public:path.normalize( __dirname + '/../../public/' ),
		templates: path.normalize( __dirname + '/../templates/' ),
		url: "http://localhost:3000/",
		year: new Date().getFullYear(),
		today: today
	},
	// The blog author
	author: {
		firstname: "Mentor",
		lastname: "Palokaj",
		email: "mentor@palokaj.co",
		twitter: "@actuallymentor",
		url: "https://www.skillcollector.com/"
	},
	// Tracking codes
	track: {
		ga: "UA-XXXXXXXX-XX"
	}
}

// grab, parse and export the config file
module.exports = config