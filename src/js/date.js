'use strict';

module.exports = {

	generate(date) {

		date = new Date(date);

		return `${date.getDate()} ${this.months[date.getMonth()]} ${date.getFullYear()}`;

	},

	months: [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	]

};
