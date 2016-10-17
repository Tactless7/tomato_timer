(function(){
	var app = {
		intervalID: null,
		startTimer: 1500,
		currentTimer: null,
		init: function(){
			app.listeners();
			app.updateTimer();
		},
		listeners: function(){
			$('#start').on('click', app.start);
			$('#stop').on('click', app.stop);
			$('#reset').on('click', app.reset);
			$('#shortBreak').on('click', app.shortBreak);
			$('#longBreak').on('click', app.longBreak);
			$('#tomato').on('click', app.tomato);
		},
		decrement: function(){
			app.intervalID = setInterval(function(){
				app.updateView();
				app.currentTimer--;
				app.percentBar();
				if (app.currentTimer < 0){
					app.stop();
				}
			}, 1000);
		},
		updateView: function(){
			$('#minutes').html(app.addZero(Math.floor(app.currentTimer / 60)));
			$('#seconds').html( app.addZero(app.currentTimer % 60));
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
			app.startTimer = 255;
			app.updateTimer();
		},
		longBreak: function(){
			app.startTimer = 600;
			app.updateTimer();
		},
		addZero: function(number){
			if(number < 10){
				number = '0' + number;
				console.log(number);
			}
			return number;
		},
		percentBar: function(){
			var percent = (app.startTimer - app.currentTimer) * 100 / app.startTimer;
			console.log(percent);
			$('.percentContent').css('width', percent + '%');
		}
	};
	app.init();
})();