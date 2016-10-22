
document.addEventListener("DOMContentLoaded", function(event) { 
  	var item = document.querySelectorAll('.accordeon--parent');
	item.onclick = function() {
	    alert( 'Спасибо' );
	    return false;
	};
});