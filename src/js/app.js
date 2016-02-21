'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

console.log(React);


{

	const items = [
		{
			type: 'Banana',
			color: 'Yellow'
		},
		{
			type: 'Apple',
			color: 'Red'
		},
		{
			type: 'Pear',
			color: 'Brown'
		},
		{
			type: 'Orange',
			color: 'orange'
		},
		{
			type: 'Strawberry',
			color: 'red'
		}
	];

	const Fruit = React.createClass({

		getInitialState() {

			return {
				alert: this.setAlertState()
			};

		},

		setAlertState(state = false) {

			const alert = {};

			this.props.items.map((item) => alert[item.type] = state);

			return alert;

		},

		alertColor(type) {

			const alert = this.state.alert;

			alert[type] = !alert[type];
			this.setState({alert});

		},

		itemsState() {

			const alert = this.state.alert;
			const keys = Object.keys(this.state.alert);
			let active = true;

			for (const key of keys) active = alert[key] ? active : false;

			return active;

		},

		toggleState() {

			const newState = this.itemsState();

			this.setState({
				alert: this.setAlertState(!newState)
			});

		},

		render() {

			return (
				<div className="fruit">

					<button
						role="button"
						onClick={this.toggleState}
					>
						Toggle All
					</button>

					<ul>
						{
							this.props.items.map((item, id) => {

								const alertState = this.state.alert;
								const alertClass = alertState[item.type] ? 'fruit__item--alert' : '';

								return (
									<li
										key={id}
										className={alertClass}
										onClick={this.alertColor.bind(this, item.type)}
									>
										{item.type}
									</li>
								);

							})
						}
					</ul>
				</div>
			);
		}
	});

	ReactDOM.render(
		<Fruit items={items}/>,
		document.getElementById('app')
	);
}
