function init() {
	var p = document.createElement('div');
	p.id = '#safe-popup';
	p.style.backgroundColor = '#000';
	p.style.position = 'fixed';
	p.style.zIndex = '9999999';
	p.style.top = p.style.left = 0;
	p.style.width = '100%';
	p.style.height = '100vh';

	document.body.appendChild(p);
}

function runRandomTest() {
	var scripts = ['tests/sample.js'];
	var script = scripts[Math.floor(Math.random() * scripts.length)];

	var s = document.createElement('script');
	s.src = chrome.extension.getURL(script);
	document.head.appendChild(s);
}

init();
runRandomTest();