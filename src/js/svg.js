'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

module.exports = React.createClass({

	path: {
		item: 'M10 16.5l6-4.5-6-4.5v9zm2-14.5c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm0 19c-5 0-9-4-9-9s4-9 9-9 9 4 9 9-4 9-9 9z',
		play: 'M8 5v14l11-7z',
		pause: 'M6 19h4v-14h-4v14zm8-14v14h4v-14h-4z',
		skip: 'M4 18l8.5-6-8.5-6v12zm9-12v12l8.5-6-8.5-6z'
	},

	getIconClass() {

		return `${this.props.component}__icon icon--${this.props.icon}`;

	},

	render() {

		const className = this.getIconClass();
		const path = this.path[this.props.icon];

		return (
			<svg className={className} height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
				<path d={path}/>
			</svg>
		);

	}

});
