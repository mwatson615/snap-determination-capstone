app.controller('NavCtrl', function() {

	$(document).ready(function(){
		$(".button-collapse").sideNav({
			menuWidth: 240,
			closeOnClick: true,
			edge: 'left',
			draggable: true
		});
	})
})
