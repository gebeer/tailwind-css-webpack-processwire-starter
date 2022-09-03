# ProcessWire Tailwind CSS webpack postcss starter

an opinionated starter for people who like to use Tailwind CSS with ProcessWire. It sets up a webpack postcss tailwind  asset pipeline with life reloading dev server tailored to ProcessWire development

## Features
- pure webpack postcss tailwind
- full babel support through .browserslist
- life reloading dev server at localhost
- configurable through .env file
- cache busting assets with 8 digit content hashes
- correct assets are loaded via ProcessWire WebpackAssets helper module
- config split up in seperate files for readability and easy maintenance

## Installation (manual way)
1. Download
2. copy the 'src' folder to your ProcessWire
3. copy the 'WebpackAssets' folder to `site/modules`
4. install the new module 'WebpackAssets" and enter the path to your webpack.manifest.json in the module settings and save

## Installation via git
1. clone this repo into your ProcessWire root
Example: root is at 'path/to/root'
```
cd path/to
git clone https://github.com/gebeer/tailwind-css-webpack-processwire-starter.git root
```
## Setup / Usage
- change into the src folder and install dependencies
```
cd src
npm install
```
- rename the .env-example file to .env and adjust the settings

- to start the dev server at localhost:port
```
npm run start
```

- to watch files without dev server
```
npm run watch
```

- build for production
```
npm run build
```
after building for production, you need to deploy webpack.manifest.json together with the CSS and JS assets

## Output assets in yout template

### CSS
```
	<?php foreach (WebpackAssets::css() as $file) : ?>
		<link rel="stylesheet" type="text/css" href="<?= $file ?>" />
	<?php endforeach ?>

```
### JS
```
	<?php foreach (WebpackAssets::js() as $file) : ?>
		<script src="<?= $file ?>"></script>
	<?php endforeach ?>
```
