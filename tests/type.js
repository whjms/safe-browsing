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

function init() {
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

	initGame(container.children);
}

function initGame(nodes) {
	window.passed = 0;
	window.total = nodes.length;
	nodes[0].className += ' active';
	window.currChar = nodes[0].innerHTML;

	document.onkeypress = function(evt) {
		if(String.fromCharCode(evt.keyCode) === currChar) {
			var container = document.getElementById('type-container');
			var nodes = container.children;

			var marginTop = container.style.marginTop;
			marginTop = ( + marginTop.substr(0, marginTop.length - 2));
			container.style.marginTop = marginTop - 1 + "ex";

			nodes[passed].className = 'char';
			
			if(passed == total - 1) {
				safeBrowsing.hidePopup();
			} else {
				nodes[passed + 1].className += ' active';
				currChar = nodes[passed + 1].innerHTML;
				passed++;
			}
		} else {
			alert('fail');
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

init();