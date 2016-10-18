'use strict';
(function(){
	var app = {
		intervalID: null,
		startTimer: 1500,
		currentTimer: null,
		init: function(){
			this.listeners();
			this.updateTimer();
			this.updateView();
		},
		listeners: function(){
			$('#start').on('click', this.start.bind(this));
			$('#stop').on('click', this.stop.bind(this));
			$('#reset').on('click', this.reset.bind(this));
			$('#shortBreak').on('click', this.shortBreak.bind(this));
			$('#longBreak').on('click', this.longBreak.bind(this));
			$('#tomato').on('click', this.tomato.bind(this));
		},
		decrement: function(){
			var that = this;
			this.intervalID = setInterval(function(){
				that.updateView();
				that.currentTimer--;
				that.percentBar();
				if (that.currentTimer < 0){
					that.stop();
				}
			}, 1000);
		},
		updateView: function(){
			$('#minutes').html(this.addZero(Math.floor(this.currentTimer / 60)));
			$('#doublePoint').html(' : ');
			$('#seconds').html( this.addZero(this.currentTimer % 60));
		},
		updateTimer: function(){
			this.currentTimer = this.startTimer;
		},
		start: function(){
			this.stop();
			this.decrement();
		},
		stop: function(){
			clearInterval(app.intervalID);
		},
		reset: function(){
			this.updateTimer();
			this.updateView();
		},
		tomato: function(){
			this.startTimer = 1500;
			this.updateTimer();
			this.updateView();
		},
		shortBreak: function(){
			this.startTimer = 300;
			this.updateTimer();
			this.updateView();
		},
		longBreak: function(){
			this.startTimer = 600;
			this.updateTimer();
			this.updateView();
		},
		addZero: function(number){
			if(number < 10){
				number = '0' + number;
			}
			return number;
		},
		percentBar: function(){
			var percent = (this.startTimer - this.currentTimer) * 100 / this.startTimer;
			$('.percentContent').css('width', percent + '%');
			$('.bodyPercent').css('height', percent + '%');
		}
	};
	app.init();
})();