'use strict';

const feed = require('./feed');
const React = require('react');
const ReactDOM = require('react-dom');
const Episodes = require('./episodes');

console.log('APP');

ReactDOM.render(
	<Episodes json={feed}/>,
	document.getElementById('episodes')
);
