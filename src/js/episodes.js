'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const Svg = require('./svg');
const Player = require('./player');

console.log('EPISODES');

module.exports = React.createClass({

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

		e.preventDefault();

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
							<li className={state} key={current}>
								<a className="episode__link" href="#" onClick={this.activateEpisode.bind(this, current)}>
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
