/* global window, $ */

'use strict';

const fs = require('fs');
const yaml = require('js-yaml');
const matchPattern = require('match-pattern');
const path = require('path');
window.$ = window.jQuery = require('jquery');
require('bootstrap');

const directoryCfg = 'cfg';
const fileCfg = 'config.yml';
const encoding = 'utf-8';
const webComponent = fs.readFileSync('page.html', encoding);

let cfg;

try {
	cfg = yaml.safeLoad(fs.readFileSync(fileCfg, encoding));
	cfg = cfg.map(elem => {
		let name = elem.name;
		elem.css = fs.readFileSync(path.join(directoryCfg, `${name}.css`), encoding);
		elem.js = fs.readFileSync(path.join(directoryCfg, `${name}.js`), encoding);

		elem.patterns = elem.patterns.map(pattern => {
			pattern = matchPattern.parse(pattern);
			if (pattern === null) {
				console.log(`Bad pattern : ${pattern} in ${name}`);
			}
			return pattern;
		});
		return elem;
	});
} catch (e) {
	console.log(e);
}

function getToInject(url) {
	for (let elem of cfg) {
		let patterns = elem.patterns;
		for (let pattern of patterns) {
			if (pattern.test(url)) {
				return {
					css: elem.css,
					js: elem.js
				};
			}
		}
	}
}

function refreshWebComponentSize() {
	let header = $('.tab-pane.active .gl-header');
	let webview = $('.tab-pane.active .gl-webview');
	if (header.length && webview.length) {
		let webviewsize = $(window).height() - header.offset().top - header.height();
		webview.height(webviewsize);
	}
}

function refreshWebComponentEvents() {
	let webview = $('.tab-pane.active .gl-webview');
	let indicator = $('.tab-pane.active .gl-indicator');

	$('.tab-pane.active .gl-refresh').click(function () {
		webview.get(0).reload();
	});

	$('.tab-pane.active .gl-dev').click(function () {
		webview.get(0).openDevTools();
	});

	$('.tab-pane.active .gl-goback').click(function () {
		webview.get(0).goBack();
	});

	$('.tab-pane.active .gl-urltext').keypress(function (e) {
		if (e.keyCode !== 13) {
			return true;
		}
		webview.get(0).src = this.value;
		return false;
	});

	webview.on('did-start-loading', () => {
		indicator.toggleClass('glyphicon glyphicon-refresh');
	});
	webview.on('did-stop-loading', () => {
		indicator.toggleClass('glyphicon glyphicon-refresh');
	});
	webview.on('load-commit', function (e) {
		let url = e.originalEvent.url;
		webview.on('did-finish-load', function () {
			let inject = getToInject(url);
			if (inject) {
				webview.get(0).insertCSS(inject.css);
				webview.get(0).executeJavaScript(inject.js);
			}
			$(this).off('did-finish-load');
		});
	});
}

$('.nav-tabs').on('click', 'span', function () {
	let anchor = $(this).siblings('a');
	$(anchor.attr('href')).remove();
	$(this).parent().remove();
	$('.nav-tabs li').children('a').first().click();
});

$('.add-url').click(function (e) {
	e.stopPropagation();
	let elemid = 'url' + $('.nav-tabs').children().length;
	$(this).closest('li').before(`<li><a href="#${elemid}" data-toggle="tab">${elemid}</a><span class="close">&times;</span></li>`);
	$('.tab-content').append(`<div class="tab-pane fade" id="${elemid}">${webComponent}</div>`);
	$('a[data-toggle="tab"]').on('shown.bs.tab', function () {
		refreshWebComponentEvents();
		refreshWebComponentSize();
	});
	$(`a[href="#${elemid}"]`).tab('show');
});

window.onresize = function () {
	refreshWebComponentSize();
};

window.onload = function () {
	refreshWebComponentEvents();
	refreshWebComponentSize();
	$('.add-url').click();
};
