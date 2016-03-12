'use strict';

console.log('TIMER');

module.exports = {

	generate(time) {

		const hours = Math.floor(time / (1 * 60 * 60));
		time = time % (1 * 60 * 60);
		const minutes = Math.floor(time / (1 * 60));
		const seconds = Math.floor(time % (1 * 60) / 1);
		const format = `${this.queryHours(hours)}${this.queryMinutes(minutes)}${this.querySeconds(seconds)}`;
		const units = this.queryUnits(format);

		return `${format} ${units}`;

	},

	forceToNumber(time) {

		return isNaN(time) ? 0 : time;

	},

	queryDigits(value) {

		return `${value}`.length < 2 ? `0${value}` : `${value}`;

	},

	queryHours(hours) {

		return hours > 0 ? `${hours}:` : '';

	},

	queryMinutes(minutes) {

		return minutes > 0 ? `${this.queryDigits(minutes)}:` : '';

	},

	querySeconds(seconds) {

		return `${this.queryDigits(seconds)}`;

	},

	queryUnits(format) {

		return format.length > 5 ? 'hrs' : format.length > 2 ? 'mins' : 'secs';

	}

};
