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
				that.percentBar();
				that.currentTimer--;
				if (that.currentTimer < 0){
					that.stop();
					$('#playVideo').html('<iframe width="896" height="480" src="http://www.youtube.com/embed/zEvl44Auv6Y?start=6&autoplay=1" frameborder="0" allowfullscreen></iframe>')
					$('iframe').addClass('playVideo');
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
			if(this.currentTimer >=0){
				$('#playVideo').html('');
			}
		},
		stop: function(){
			clearInterval(app.intervalID);
			$('#playVideo').html('');
		},
		reset: function(){
			this.updateTimer();
			this.updateView();
			$('#playVideo').html('');
		},
		tomato: function(){
			this.startTimer = 1500;
			this.updateTimer();
			this.updateView();
			$('#playVideo').html('');
		},
		shortBreak: function(){
			this.startTimer = 3;
			this.updateTimer();
			this.updateView();
			$('#playVideo').html('');
		},
		longBreak: function(){
			this.startTimer = 600;
			this.updateTimer();
			this.updateView();
			$('#playVideo').html('');
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