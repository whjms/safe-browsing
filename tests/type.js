var safeBrowsing = {
	getPopup : function() {
		return document.getElementById('#safe-popup');
	},

	hidePopup : function() {
		this.getPopup().style.display = 'none';
	}
}

function init() {
	var p = safeBrowsing.getPopup();

	var total = Math.floor(Math.random() * 10) + 5;
	var chars = [];
	var charNodes = [];
	for(i = 0; i < total; i++) {
		chars[i] = getRandomKey();
		p.appendChild(getCharNode(chars[i]));
	}

	safeBrowsing.hidePopup();
}

function getRandomKey() {
	var num = Math.floor(Math.random() * 26) + 65;
	return String.fromCharCode(num);
}

function getCharNode(chr) {
	var container = document.createElement('div');
	container.className = 'char';
	container.innerHTML = chr;
	return container;
}

init();