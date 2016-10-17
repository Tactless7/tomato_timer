(function(){
	var app = {
		intervalID: null,
		timer: 1500,
		init: function(){
			app.listeners();
		},
		listeners: function(){
			$('#start').on('click', app.start);
			$('#stop').on('click', app.stop);
			$('#reset').on('click', app.reset);
		},
		updateView: function(){
			$('#minutes').html(Math.floor(app.timer / 60));
			$('#seconds').html(app.timer % 60);
		},
		start: function(){
			app.stop();
			app.intervalID = setInterval(function(){
				app.timer--;
				app.updateView();
			}, 1000);
		},
		stop: function(){
			clearInterval(app.intervalID);
		},
		reset: function(){
			app.timer = 1500;
		}
	}
	app.init();
})();