class WeddingCountdown {
	constructor(targetDate) {
		this.targetDate = new Date(targetDate);
		this.elements = {
			days: document.getElementById('days'),
			hours: document.getElementById('hours'),
			minutes: document.getElementById('minutes'),
			seconds: document.getElementById('seconds')
		};
	}

	start() {
		this.update();
		setInterval(() => this.update(), 1000);
	}

	update() {
		const now = new Date();
		const distance = this.targetDate - now;
		
		if (distance < 0) {
			this.onComplete();
			return;
		}

		const days = Math.floor(distance / (1000 * 60 * 60 * 24));
		const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((distance % (1000 * 60)) / 1000);

		this.updateDisplay(days, hours, minutes, seconds);
	}

	updateDisplay(days, hours, minutes, seconds) {
		this.elements.days.textContent = days;
		this.elements.hours.textContent = hours;
		this.elements.minutes.textContent = minutes;
		this.elements.seconds.textContent = seconds;
	}

	onComplete() {
		document.getElementById('countdown-timer').innerHTML = "¡El momento ha llegado!";
	}
}