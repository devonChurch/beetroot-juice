'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const date = require('./date');
const Svg = require('./svg');
const Player = require('./player');

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

	getListState() {

		const className = 'episodes__list';
		const modifier = this.state.active === null ? `${className}--dormant` : `${className}--expanded`;

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

		const listState = this.getListState();

		return (

			<ul className={listState}>
				{

					this.props.json.map((episode, current) => {

						const episodeState = this.getEpisodeState(current);

						return (
							<li className={episodeState} key={current}>
								<a className="episode__link" href="#" onClick={this.activateEpisode.bind(this, current)}>
									<Svg component={'episode'} icon={'item'}/>
									<h2 className="episode__title">{episode.title}</h2>
									<span className="episode__date">{date.generate(episode.date)}</span>
									<p className="episode__description">{episode.desc}</p>
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
