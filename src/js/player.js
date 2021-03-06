'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const Svg = require('./svg');
const timer = require('./timer');

module.exports = React.createClass({

	getInitialState() {

		return {
			track: this.loadTrack(),
			phase: 'play',
			elapsed: 0
		};

	},

	componentWillMount() {

		this.trackPhase('play');

	},

	componentDidMount() {

		const player = ReactDOM.findDOMNode(this);

		this.positionPing(player);
		this.activatePlayer(player);

		this.listeners('on');

	},

	componentWillUnmount() {

		// Stops auto from continuing to play when player is no longer relevant.
		this.trackPhase('stop');
		// Remove redundant listeners from listening / firing.
		this.listeners('off');

	},

	listeners(action) {

		action = action === 'on' ? 'addEventListener' : 'removeEventListener';

		this.state.track[action]('timeupdate', this.updateElapsed);
		window[action]('scroll', this.queryFixation);

	},

	loadTrack() {

		return new Audio(this.props.json.mp3);

	},

	updateElapsed() {

		this.setState({elapsed: this.state.track.currentTime});

	},

	skippedElapsed(direction) {

		const duration = this.state.track.duration;
		const current = this.state.track.currentTime;
		const offset = 30;
		let elapsed = direction === 'forward' ? current + offset : current - offset;

		this.state.track.currentTime = elapsed < 0 ? 0 : elapsed > duration ? duration : elapsed;

	},

	trackPhase(phase) {

		const action = phase === 'play' ? 'play' : 'pause';

		this.state.track[action]();
		if (phase === 'stop') this.state.track.src = '';
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

	queryFixation() {

		const player = ReactDOM.findDOMNode(this);
		const y = player.getBoundingClientRect().top;
		const state = y <= 0 ? 'top' : y + 140 >= window.innerHeight ? 'bottom' : null;

		if (state) player.setAttribute('data-fixed', state);
		else player.removeAttribute('data-fixed');

	},

	modifyProgress(duration, e) {

		const player = ReactDOM.findDOMNode(this);
		const progress = player.getElementsByClassName('player__progress')[0];
		const bounds = progress.getBoundingClientRect();
		const min = bounds.left;
		const max = bounds.right;
		const x = e.clientX;
		const percentage = (x - min) / (max - min);
		const elapsed = duration * percentage;

		this.state.track.currentTime = elapsed;

	},

	render() {

		const duration = timer.forceToNumber(this.state.track.duration);
		const elapsed = timer.forceToNumber(this.state.track.currentTime);

		return (
			<div className="player">
				<div className="player__fixed">
					<div className="player__wrapper">
						<div className="player__background"></div>
						<h3 className="player__title">{this.props.json.title}</h3>
						<ul className="player__controls">
							<li className="player__control">
								<button onMouseDown={this.skippedElapsed.bind(this, 'back')} className="player__button player__button--back" type="button" name="skip back">
									<Svg component={'player'} icon={'skip'}/>
								</button>
							</li>
							<li className="player__control">
								{

									(() => {

										const phase = this.state.phase === 'play' ? 'pause' : 'play';
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
								<button onMouseDown={this.skippedElapsed.bind(this, 'forward')} className="player__button player__button--forward" type="button" name="skip forward">
									<Svg component={'player'} icon={'skip'}/>
								</button>
							</li>
						</ul>
						<div className="player__time">
							<progress onClick={this.modifyProgress.bind(this, duration)} className="player__progress" max={duration} value={elapsed}></progress>
							<span className="player__elapsed">{timer.generate(elapsed)}</span>
							<span className="player__total">{timer.generate(duration)}</span>
						</div>
					</div>
				</div>
			</div>
		);

	}

});
