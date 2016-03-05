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

const Svg = React.createClass({

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

const Player = React.createClass({

	componentDidMount() {

		const player = ReactDOM.findDOMNode(this);

		this.positionPing(player);
		this.activatePlayer(player);

	},

	positionPing(player) {

		const background = player.getElementsByClassName('player__background')[0]; // .getBoundingClientRect();
		const bounds = background.getBoundingClientRect();
		const cursor = this.props.cursor;
		const x = cursor.left;
		const y = cursor.top - bounds.top;

		background.style.left = `${x}px`;
		background.style.top = `${y}px`;

	},

	activatePlayer(player) {

		setTimeout(() => player.classList.add('player--active'), 0);

	},

	render() {

		return (
			<div className="player">
				<div className="player__background"></div>
				<h3 className="player__title">{this.props.json.title}</h3>
				<ul className="player__controls">
					<li className="player__control">
						<button className="player__button player__button--back" type="button" name="Skip forward">
							<Svg component={'player'} icon={'skip'}/>
						</button>
					</li>
					<li className="player__control">
						<button className="player__button player__button--play" type="button" name="Play">
							<Svg component={'player'} icon={'play'}/>
						</button>
					</li>
					<li className="player__control">
						<button className="player__button player__button--forward" type="button" name="Skip back">
							<Svg component={'player'} icon={'skip'}/>
						</button>
					</li>
				</ul>
				<div className="player__time">
					<progress className="player__progress" max="100" value="80"></progress>
					<span className="player__elapsed">12.45</span>
					<span className="player__total">34.27</span>
				</div>
			</div>
		);

	}

});

const App = React.createClass({

	getInitialState() {

		return {
			active: null,
			cursor: {left: null, top: null}
		};

	},

	getEpisodeState(current) {

		const active = this.state.active;
		const className = 'episode';
		const modifier = active === null ? '' :
                         current === active ? `${className}--active` :
                         current > active ? `${className}--dormantBefore` :
                         `${className}--dormantAfter`;

		return `${className} ${modifier}`;

	},

	activateEpisode(current, e) {

		this.setState({
			active: current,
			cursor: this.cursorLocation(e)
		});

	},

	cursorLocation(e) {

		const left = e.clientX;
		const top = e.clientY;

		return {left, top};

	},

	render() {

		return (

			<ul className="episodes__list">
				{
					this.props.json.map((episode, current) => {

						const state = this.getEpisodeState(current);

						return (
							<li className={state}
								key={current}
								onClick={this.activateEpisode.bind(this, current)}>
								<a className="episode__link">
									<Svg component={'episode'} icon={'item'}/>
									<h2 className="episode__title">{episode.title}</h2>
									<span className="episode__date">12 February 2016</span>
									<p className="episode__description">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
								</a>
								{this.state.active === current ? <Player json={this.props.json[current]} cursor={this.state.cursor}/> : ''}
							</li>

						);

					})
				}
			</ul>

		);

	}

});

ReactDOM.render(
	<App json={json}/>,
	document.getElementById('episodes')
);



// <div className="player">
//
// 	<audio src={this.props.json.mp3} controls autoPlay loop />
//
// </div>

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

// const svg = {
//
// 	create(icon) {
//
// 		return (
// 			`<svg class="episode__icon icon--${icon}" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
//  				${this[icon]}
//  			</svg>`
// 		);
//
// 	},
//
// 	item: '<path d="M10 16.5l6-4.5-6-4.5v9zm2-14.5c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm0 19c-5 0-9-4-9-9s4-9 9-9 9 4 9 9-4 9-9 9z"/>',
// 	play: '<path d="M8 5v14l11-7z"/>',
// 	pause: '<path d="M6 19h4v-14h-4v14zm8-14v14h4v-14h-4z"/>',
// 	skip: '<path d="M4 18l8.5-6-8.5-6v12zm9-12v12l8.5-6-8.5-6z"/>'
//
// };

// const Feed = React.createClass({
//
// 	active(id) {
//
// 		this.props.app.setState({
// 			active: id
// 		});
//
// 	},
//
// 	render() {
//
//
// 		//
// 		// console.log(this.props.app);
//
// 		return (
//
// 			<ul className="podcast__feed">
// 				{
// 					this.props.json.map((episode, id) => {
//
// 						const active = this.props.active === id;
// 						let className = 'podcast__episode';
// 						className = active ? `${className} ${className}--active` : className;
//
// 						return (
// 							<li className={className}
// 								key={id}
// 								onClick={this.active.bind(this, id)}>
//
// 								<h2>{episode.title}</h2>
// 								{active ? <h2>PLAYER!</h2> : ''}
//
// 							</li>
// 						);
//
// 					})
// 				}
// 			</ul>
//
// 		);
//
// 	}
//
// });

// {active ? <Player app={this.props.app} json={this.props.json[id]} json={this.props.json} active={this.state.active}/> : ''}
// <audio src={this.props.json[id].mp3} controls autoPlay loop />

// <div className="podcast">
// 	<h1 className="podcast__heading"></h1>
// 	<Feed app={this}
//           json={this.props.json}
//           active={this.state.active}/>
// </div>

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
