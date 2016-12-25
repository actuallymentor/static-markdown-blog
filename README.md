# Static Markdown Blog [![Build Status](https://travis-ci.org/actuallymentor/static-markdown-blog.svg?branch=master)](https://travis-ci.org/actuallymentor/static-markdown-blog)

<img height="50px" alt="webpack" src="http://i.imgur.com/ZtANAeL.png" />
<img height="50px" alt="browsersync" src="http://i.imgur.com/L5peje9.png" />
<img height="50px" alt="mocha" src="http://i.imgur.com/yo9d9Qe.png" />

To replace my old WordPress blog I'm making a system to compile markdown files to static blog files.

I considered systems like hexa.io but find them too complex for my needs.

## Getting started

Clone this repository:

```shell
git clone https://github.com/actuallymentor/static-markdown-blog.git
```

Terminal commands:

```shell
npm preview # Preview production build using browsersync
npm build # Build the blog files
npm start # Start dev server which watches the css and js files
```

## About the system

Understanding the file structure:

| Path | Function |
| ------ | -------- |
| content | Holds your markdown files and their meta files
| content/assets | Holds your static resources like images
| system | Holds the files that compile the markdown to html
| system/modules/config.js | Holds the blog configurations like page title and blog author
| system/templates | Holds the pug templates for the blog pages
| system/theme
| public | This is where the compiled static blog files end up

Important things to know:

1. In the content/ folder each post has an .md and a .md.json file
    - The md file holds the post
    - The .md.json file the meta data like categories and featured image
2. In the .md files you can reference the assets folder locally as ./assets, this will be changed to /assets in the compiled blog version