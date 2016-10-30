
var items = document.querySelectorAll('.accordeon--parent');
for(var i=0; i<items.length; i++) {
	items[i].addEventListener('click', function(event) {
	  	for(var y=0; y<items.length; y++) {
	  		items[y].classList.remove('active');
	  	}
	  	this.classList.toggle('active');
		event.preventDefault();
	}, false);
};
