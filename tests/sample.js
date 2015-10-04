var safeBrowsing = {
	getPopup : function() {
		return document.getElementById('#safe-popup');
	},

	hidePopup : function() {
		this.getPopup().style.display = 'none';
	}
}

var p = safeBrowsing.getPopup();

var button = document.createElement('button');
button.innerHTML = 'click';
button.style = '';
button.style.width = '100px';
button.style.display = 'block';
button.style.margin = '40vh auto';

button.addEventListener('click', function() {
	safeBrowsing.hidePopup();
});

p.appendChild(button);