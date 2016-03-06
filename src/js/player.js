'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const Svg = require('./svg');

console.log('PLAYER');

module.exports = React.createClass({

	getInitialState() {

		console.log('initial state');

		return {
			track: this.loadTrack(),
			phase: 'play'
		};

	},

	componentWillMount() {

		console.log('WILL mount');

		this.trackPhase('play');

	},

	componentDidMount() {

		const player = ReactDOM.findDOMNode(this);

		this.positionPing(player);
		this.activatePlayer(player);

	},

	componentWillUnmount() {

		// Stops auto from continuing to play when player is no longer relevant.
		this.trackPhase('stop');

	},

	loadTrack() {

		return new Audio(this.props.json.mp3);

	},

	//  track.addEventListener('timeupdate', function () {

	// 	duration.setCurrent();
	//
	// });

	trackPhase(phase) {

		const action = phase === 'play' ? 'play' : 'pause';

		this.state.track[action]();
		if (phase === 'stop') this.state.track.src = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAVFYAAFRWAAABAAgAZGF0YQAAAAA=';
		this.setState({phase: phase});

	},

	togglePhase() {

		const phase = this.state.phase === 'play' ? 'pause' : 'play';

		this.trackPhase(phase);

	},

	positionPing(player) {

		const background = player.getElementsByClassName('player__background')[0];
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
						<button className="player__button player__button--back" type="button" name="skip forward">
							<Svg component={'player'} icon={'skip'}/>
						</button>
					</li>
					<li className="player__control">
						{

							(() => {

								const phase = this.state.phase;
								console.log('rending phase icon', phase);
								const className = `player__button player__button--${phase}`;

								return (
									<button onClick={this.togglePhase} className={className} type="button" name={phase}>
										<Svg component={'player'} icon={phase}/>
									</button>
								);

							})()

						}
					</li>
					<li className="player__control">
						<button className="player__button player__button--forward" type="button" name="skip back">
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
