/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

const fs = require('fs');
const util = require('util');
const sass = require('sass');
const gaze = require('gaze');
const bs = require('browser-sync').create();

// copy normalize css
fs.copyFileSync('./node_modules/modern-normalize/modern-normalize.css', './css/modern-normalize.css');

bs.init({
	server: '.',
	open: false,
});

async function compile() {
	const render = util.promisify(sass.render);
	let compiledSass;
	try {
		compiledSass = await render({
			file: './sass/main.scss',
			sourceMapEmbed: true,
		});
	} catch (error) {
		console.log(error);
	}
	fs.writeFileSync('./css/main.css', compiledSass.css);
	console.log('');
	console.log('👌  Compiled Sass');
	console.log('');
	bs.reload('*.css');
}

compile();

gaze('./sass/**/*.scss', (error, watcher) => {
	if (error) {
		console.log(error);
	}

	watcher.on('changed', compile);
	watcher.on('added', compile);
});

gaze('./js/**/*.js', (error, watcher) => {
	if (error) {
		console.log(error);
	}

	watcher.on('changed', () => {
		bs.reload('*.js');
	});

	watcher.on('added', () => {
		bs.reload('*.js');
	});
});

gaze('./index.html', (error, watcher) => {
	if (error) {
		console.log(error);
	}

	watcher.on('changed', () => {
		bs.reload();
	});
});
