var safeBrowsing = {
	getPopup : function() {
		return document.getElementById('safe-popup');
	},

	hidePopup : function() {
		var self = this;
		this.getPopup().style.opacity = 0;
		setTimeout(function() {
			self.getPopup().style.display = 'none';
		}, 200);
	}
}

var TYPE_TIME_PER_CHAR = 200;

function type_init() {
	var p = safeBrowsing.getPopup();

	var container = document.createElement('div');
	container.id = 'type-container';
	p.appendChild(container);

	var total = Math.floor(Math.random() * 10) + 5;
	var chars = [];
	for(i = 0; i < total; i++) {
		chars[i] = getRandomKey();
		container.appendChild(getCharNode(chars[i]));
	}

	var bar = document.createElement('progress');
	bar.id = "bar";
	bar.setAttribute("max", total * TYPE_TIME_PER_CHAR);
	bar.setAttribute("value", total * TYPE_TIME_PER_CHAR);
	p.appendChild(bar);

	initGame(container.children);
}

function gameOver() {
	document.onkeypress = undefined;
	window.clearInterval(window.timerInterval);
	safeBrowsing.getPopup().style.backgroundColor = "#000";

	var container = document.getElementById('type-container');
	container.style.marginTop = (+ container.style.marginTop.slice(0, -2)) + 200 + "px";
	container.style.opacity = '0';
	document.getElementById('bar').style.opacity = '0';

	var msg = document.createElement('h1');
	msg.innerHTML = 'This page has been blocked for you\'re safety';
	msg.id = 'msg';
	safeBrowsing.getPopup().appendChild(msg);

	var s = chrome.storage;
}

function updateBar(value) {
	document.getElementById('bar').setAttribute('value', value);
}

function initGame(nodes) {
	window.passed = 0;
	window.total = nodes.length;
	window.timeLeft = TYPE_TIME_PER_CHAR * total;
	nodes[0].className += ' active';
	window.currChar = nodes[0].innerHTML;

	window.timerInterval = window.setInterval(function() {
		window.timeLeft -= 12;
		updateBar(window.timeLeft);
		safeBrowsing.getPopup().style.backgroundColor = "rgba(0,0,0," +
			(1 - (window.timeLeft * 0.75 / (TYPE_TIME_PER_CHAR * window.total))) + ")";

		if(window.timeLeft <= 0) {
			gameOver();
		}
	}, 10);

	document.onkeypress = function(evt) {
		evt.preventDefault();

		if(String.fromCharCode(evt.keyCode) === currChar) {
			var container = document.getElementById('type-container');
			var nodes = container.children;

			var marginTop = (+ container.style.marginTop.slice(0, -2));

			var charMarginTop = getComputedStyle(nodes[passed]).marginTop;
			charMarginTop = ( + charMarginTop.substr(0, charMarginTop.length - 2));

			container.style.marginTop = marginTop -
				nodes[passed].clientHeight - charMarginTop + "px";

			nodes[passed].className = 'char passed';

			if(passed == total - 1) {
				safeBrowsing.hidePopup();
				document.onkeypress = undefined;
				window.clearInterval(window.timerInterval);
			} else {
				nodes[passed + 1].className += ' active';
				currChar = nodes[passed + 1].innerHTML;
				passed++;
				timeLeft = Math.min(timeLeft + TYPE_TIME_PER_CHAR,
					total * TYPE_TIME_PER_CHAR);

				var bar = document.getElementById('bar');
				bar.setAttribute('value', timeLeft);
			}
		} else {
			gameOver();
		}
	};


}

function getRandomKey() {
	var num = Math.floor(Math.random() * 26) + 97;
	return String.fromCharCode(num);
}

function getCharNode(chr) {
	var container = document.createElement('div');
	container.className = 'char';
	container.innerHTML = chr;
	return container;
}

chrome.runtime.onMessage.addListener(function(request) {
	if(request.testName === 'type') {
		type_init();
	}
});