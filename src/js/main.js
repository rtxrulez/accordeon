
function ready() {
	var item = document.querySelectorAll('.accordeon--parent');

	for(var i=0; i<item.length; i++) {
		item[i].addEventListener('click', function(event) {
			event.preventDefault();
			console.log('ok');
		}, false);
	};
}

document.addEventListener("DOMContentLoaded", ready);

