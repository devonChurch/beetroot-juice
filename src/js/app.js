'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

console.log(React);

const json = [
	{
		title: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
		mp3: 'http://traffic.libsyn.com/xerohour/Xero_Gravity_Podcast_-_Courtney_and_JD_1.1.mp3'

	},
	{
		title: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
		mp3: 'http://traffic.libsyn.com/xerohour/Xero_Gravity_Podcast_-_Judy_and_Dr_Sabine_1.1.mp3'

	},
	{
		title: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
		mp3: 'http://traffic.libsyn.com/xerohour/Xero_Gravity_Podcast_-_Rochelle_and_Justin_2.0.mp3'

	},
	{
		title: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
		mp3: 'http://traffic.libsyn.com/xerohour/Xero_Gravity_Podcast_-_David_and_Russ_2.0.mp3'

	},
	{
		title: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
		mp3: 'http://traffic.libsyn.com/xerohour/Xero_Gravity_Podcast_-_Josh_and_Greg_3.0.mp3'

	}
];

// const svg = (() => {
//
// 	const
//
// 	item = () => {
//
// 		return (
// 			`<svg class="podcast__icon--item" version="1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
// 				<path d="M0 0h24v24h-24v-24z" fill="none"/>
// 				<path d="M10 16.5l6-4.5-6-4.5v9zm2-14.5c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm0 19c-5 0-9-4-9-9s4-9 9-9 9 4 9 9-4 9-9 9z"/>
// 			</svg>`
// 		);
//
// 	},
//
// 	play = () => {
//
// 		return (
// 			`<svg class="podcast__icon--play" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
// 				<path d="M8 5v14l11-7z"/>
// 				<path d="M0 0h24v24h-24z" fill="none"/>
// 			</svg>`
// 		);
//
// 	},
//
// 	pause = () => {
//
// 		return (
// 			`<svg class="podcast__icon--pause" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
// 				<path d="M6 19h4v-14h-4v14zm8-14v14h4v-14h-4z"/>
// 				<path d="M0 0h24v24h-24z" fill="none"/>
// 			</svg>`
// 		);
//
// 	},
//
// 	forward = () => {
//
// 		return (
// 			`<svg class="podcast__icon--forward" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
// 				<path d="M4 18l8.5-6-8.5-6v12zm9-12v12l8.5-6-8.5-6z"/>
// 				<path d="M0 0h24v24h-24z" fill="none"/>
// 			</svg>`
// 		);
//
// 	};
//
// 	return {
// 		item: item(),
// 		play: play(),
// 		pause: pause(),
// 		forward: forward()
// 	};
//
// })();

const svg = {

	create(icon) {

		return (
			`<svg class="icon--${icon}" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
 				${this[icon]}
 			</svg>`
		);

	},

	item: '<path d="M10 16.5l6-4.5-6-4.5v9zm2-14.5c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm0 19c-5 0-9-4-9-9s4-9 9-9 9 4 9 9-4 9-9 9z"/>',
	play: '<path d="M8 5v14l11-7z"/>',
	pause: '<path d="M6 19h4v-14h-4v14zm8-14v14h4v-14h-4z"/>',
	forward: '<path d="M4 18l8.5-6-8.5-6v12zm9-12v12l8.5-6-8.5-6z"/>'

};

const Feed = React.createClass({

	active(id) {

		this.props.app.setState({
			active: id
		});

	},

	render() {


		//
		// console.log(this.props.app);

		return (

			<ul className="podcast__feed">
				{
					this.props.json.map((episode, id) => {

						const active = this.props.active === id;
						let className = 'podcast__episode';
						className = active ? `${className} ${className}--active` : className;

						return (
							<li className={className}
								key={id}
								onClick={this.active.bind(this, id)}>

								<h2>{episode.title}</h2>
								{active ? <h2>PLAYER!</h2> : ''}

							</li>
						);

					})
				}
			</ul>

		);

	}

});

// {active ? <Player app={this.props.app} json={this.props.json[id]} json={this.props.json} active={this.state.active}/> : ''}
// <audio src={this.props.json[id].mp3} controls autoPlay loop />

const Player = React.createClass({

	render() {

		console.log(this.props.app);

		const id = this.props.active;

		return (
			<div className="podcast__player">

				{Number.isInteger(id) ? <audio src={this.props.json[id].mp3} controls autoPlay loop /> : ''}

			</div>
		);

	}

});

const App = React.createClass({


	getInitialState() {

		return {
			active: null
		};

	},

	render() {

		return (
			<div className="podcast">
				<h1 className="podcast__heading"></h1>
				<Feed app={this}
                      json={this.props.json}
                      active={this.state.active}/>
			</div>
		);

	}

});

// ReactDOM.render(
// 	<App json={json}/>,
// 	document.getElementById('podcast')
// );

// <Player app={this} json={this.props.json} active={this.state.active}/>

// {
//
// 	const items = [
// 		{
// 			type: 'Banana',
// 			color: 'Yellow'
// 		},
// 		{
// 			type: 'Apple',
// 			color: 'Red'
// 		},
// 		{
// 			type: 'Pear',
// 			color: 'Brown'
// 		},
// 		{
// 			type: 'Orange',
// 			color: 'orange'
// 		},
// 		{
// 			type: 'Strawberry',
// 			color: 'red'
// 		}
// 	];
//
// 	const Fruit = React.createClass({
//
// 		getInitialState() {
//
// 			return {
// 				alert: this.setAlertState()
// 			};
//
// 		},
//
// 		setAlertState(state = false) {
//
// 			const alert = {};
//
// 			this.props.items.map((item) => alert[item.type] = state);
//
// 			return alert;
//
// 		},
//
// 		alertColor(type) {
//
// 			const alert = this.state.alert;
//
// 			alert[type] = !alert[type];
// 			this.setState({alert});
//
// 		},
//
// 		itemsState() {
//
// 			const alert = this.state.alert;
// 			const keys = Object.keys(this.state.alert);
// 			let active = true;
//
// 			for (const key of keys) active = alert[key] ? active : false;
//
// 			return active;
//
// 		},
//
// 		toggleState() {
//
// 			const newState = this.itemsState();
//
// 			this.setState({
// 				alert: this.setAlertState(!newState)
// 			});
//
// 		},
//
// 		render() {
//
// 			return (
// 				<div className="fruit">
//
// 					<button
// 						role="button"
// 						onClick={this.toggleState}
// 					>
// 						Toggle All
// 					</button>
//
// 					<ul>
// 						{
// 							this.props.items.map((item, id) => {
//
// 								const alertState = this.state.alert;
// 								const alertClass = alertState[item.type] ? 'fruit__item--alert' : '';
//
// 								return (
// 									<li
// 										key={id}
// 										className={alertClass}
// 										onClick={this.alertColor.bind(this, item.type)}
// 									>
// 										{item.type}
// 									</li>
// 								);
//
// 							})
// 						}
// 					</ul>
// 				</div>
// 			);
// 		}
// 	});
//
// 	ReactDOM.render(
// 		<Fruit items={items}/>,
// 		document.getElementById('app')
// 	);
// }
