# ProcessWire helper module for including assets produced by webpack with webpack.manifest.json

## What it does
This module provides some static methods to include CSS and JS Assets with webpack Cache Busting hashes into your templates by parsing the webpack.manifest.json and providing the correct URIs to the hashed asset files.

## Installation
manually: like any other module, download and place folder `WebpackAssets` inside `/site/modules' and the install from backend

via git: inside `/site/modules`: `git clone https://github.com/gebeer/WebpackAssets.git`

via git as submodule: inside `/site/modules`: `git submodule add https://github.com/gebeer/WebpackAssets.git`

## Configuration
In module settings add the path to your `webpack.manifest.json` file

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