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

const Feed = React.createClass({

	active(id) {

		this.props.app.setState({
			active: id
		});

	},

	render() {


		//
		// console.log(this.props.app)

		return (

			<ul className="podcast__feed">
				{
					this.props.json.map((episode, id) => {

						let className = 'podcast__episode';
						className = this.props.active === id ? `${className} ${className}--active` : className;

						return (
							<li className={className}
								key={id}
								onClick={this.active.bind(this, id)}>
								<h2>{episode.title}</h2>
							</li>
						);

					})
				}
			</ul>

		);

	}

});

// <audio src={this.props.json[id].mp3} controls autoPlay loop />

const Player = React.createClass({

	render() {

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
				<Feed app={this} json={this.props.json} active={this.state.active}/>
				<Player app={this} json={this.props.json} active={this.state.active}/>
			</div>
		);

	}

});

ReactDOM.render(
	<App json={json}/>,
	document.getElementById('podcast')
);


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
