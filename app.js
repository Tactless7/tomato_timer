(function(){
	'use strict';
	var app = {
		deadline: null,
		actualDate: null,
		sessionTimer: 10000,
		intervalID: null,
		startTimer: 10000,
		currentTimer: null,
		state: 'tomato',
		init: function(){
			this.listeners();
			// this.updateTimer();
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
		getDate: function(){
			this.actualDate = Date.now();
			this.deadline = this.actualDate + this.sessionTimer;
		},
		getRemainingTime: function(){
			var remainingTime = this.deadline - Date.now();
			var minutes = Math.floor(this.sessionTimer / 60000)
			var seconds = Math.floor((this.sessionTimer % 60000 / 1000));
			var milSec = this.sessionTimer % 60000 % 1000;
			return {
				totalMilSec: remainingTime,
				minutes: minutes,
				seconds: seconds,
				milSec: milSec
			}
		},
		decrement: function(){
			var self = this;
			this.intervalID = setInterval(function(){
				self.updateView();
				self.percentBar();
				// self.currentTimer--;
				// if (self.currentTimer < 0){
				// 	self.stop();
				// 	self.currentState();
				// }
			}, 100);
		},
		updateView: function(){
			var remaining = this.getRemainingTime();
			$('#minutes').html(this.addZero(remaining.minutes));
			$('.doublePoint').html(':');
			$('#seconds').html(this.addZero(remaining.seconds));
			$('#milSec').html(this.addZero(remaining.milSec));
		},
		updateTimer: function(){
			this.currentTimer = this.startTimer;
		},
		start: function(){
			// this.stop();
			this.getDate();
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
			this.state = 'tomato';
			this.startTimer = 1500;
			this.updateTimer();
			this.updateView();
		},
		shortBreak: function(){
			this.state = 'shortBreak';
			this.startTimer = 300;
			this.updateTimer();
			this.updateView();
		},
		longBreak: function(){
			this.state = 'longBreak';
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
		},
		currentState: function(){
			if (this.state === 'tomato'){
				this.successPomodoro();
			}
			else {
				this.breakEnd();
			}
		},
		successPomodoro: function(){
			var self = this;
			swal({
				title: 'You made it !',
				text: 'You worked a full session',
				type: 'success',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				confirmButtonText: 'Short Break',
				confirmButtonClass: 'swalShortBreak',
				cancelButtonColor: '#3085d6',
				cancelButtonText: 'Long Break',
				cancelButtonClass: 'swalLongBreak',
				buttonsStyling : true
			}).then(function(){
				self.shortBreak();
				self.start();
			}, function(dismiss) {
				if(dismiss === 'cancel'){
					self.longBreak();
					self.start();
				}
			})
		},
		breakEnd: function(){
			var self = this;
			swal({
				title: 'Break End !',
				text: 'Let\'s have another working session',
				type: 'warning',
				showCancelButton: false,
				confirmButtonColor: '#3085d6',
				confirmButtonText: 'Back to Business',
				confirmButtonClass: 'swalTomato',
				buttonsStyling: true
			}).then(function(){
				self.tomato();
				self.start();
			})
		}
	};
	app.init();
})();