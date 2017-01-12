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
npm run new # Create a new .md and .md.json for a new post
npm run preview # Preview production build using browsersync
npm run build # Build the blog files
npm run start # Start dev server which watches the css and js files
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

1. In the content/ folder each post has a config section in the .md file
2. In the .md files you can reference the assets folder locally as ./assets, this will be changed to /assets in the compiled blog version
3. Images with id="feat" are compressed to featured image size (see config)
4. Images in posts are resized to post image size (see config)
5. Images with class="thumb" are compressed to thumbnail size

### Editing themes

The pug files in the system/templates folder supply the markup structure. The styling and js comes from the theme/ folder.