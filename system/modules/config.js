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
		logo: "assets/logo.jpg", // Add dimensions in the ld+json schema
		image: "assets/image.jpg", // For sharing. Add dimensions in the ld+json schema
		language: 'en'
	},
	// System settings
	system: {
		blogslug: "post",
		content: path.normalize( __dirname + '/../../content/' ),
		public:path.normalize( __dirname + '/../../public/' ),
		templates: path.normalize( __dirname + '/../templates/' ),
		url: process.env.local ? "http://localhost:3000/" : "https://www.yourliveblog.com",
		year: new Date().getFullYear(),
		today: today,
		// Google verification code
		gverification: undefined,
		// Image dimensions for compression
		images: {
			quality: 75,
			thumb: { w: 200, h: 200 },
			post: { w: 500 },
			feat: { w: 800 }
		}
	},
	// The blog author
	author: {
		firstname: "Mentor",
		lastname: "Palokaj",
		email: "mentor@palokaj.co",
		twitter: "@actuallymentor",
		// facebook profile id, used for retargeting ad permissions
		facebook: "1299359953416544",
		url: "https://www.skillcollector.com/"
	},
	// Podcast data
	podcast: {
		image: 'assets/image.svg'
	},
	// Tracking codes
	track: {
		ga: "UA-XXXXXXXX-XX"
	}
}

// grab, parse and export the config file
module.exports = config