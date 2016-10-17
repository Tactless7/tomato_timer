(function(){
	var app = {
		intervalID: null,
		startTimer: 1500,
		currentTimer: 1500,
		init: function(){
			app.listeners();
		},
		listeners: function(){
			$('#start').on('click', app.start);
			$('#stop').on('click', app.stop);
			$('#reset').on('click', app.reset);
			$('#shortBreak').on('click', app.shortBreak);
			$('#longBreak').on('click', app.longBreak);
			$('#tomato').on('click', app.tomato);
		},
		updateView: function(){
			$('#minutes').html(Math.floor(app.currentTimer / 60));
			$('#seconds').html(app.currentTimer % 60);
		},
		decrement: function(){
			app.intervalID = setInterval(function(){
				app.currentTimer--;
				app.updateView();
			}, 1000);
		},
		updateTimer: function(){
			app.currentTimer = app.startTimer;
		},
		start: function(){
			app.stop();
			app.decrement();
		},
		stop: function(){
			clearInterval(app.intervalID);
		},
		reset: function(){
			app.updateTimer();
			app.updateView();
		},
		tomato: function(){
			app.startTimer = 1500;
			app.updateTimer();
			},
		shortBreak: function(){
			app.startTimer = 300;
			app.updateTimer();
		},
		longBreak: function(){
			app.startTimer = 600;
			app.updateTimer();
		}
	};
	app.init();
})();