import React, { Component, PropTypes } from 'react';
import '../styles/styles.scss';
import '../styles/loginForm-component.scss';

class LoginForm extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { onLogin } = this.props;
		return (
			<div className="login-form">
				<div className="demo-card-wide mdl-card mdl-shadow--2dp">
					<div className="mdl-card__title">
						<h2 className="mdl-card__title-text">Welcome</h2>
					</div>
					<div className="mdl-card__supporting-text">
						<p>Webpage that styles <a href="https://mail.google.com/tasks/canvas" target="_blank">https://mail.google.com/tasks/canvas</a> in a visual attractive manner</p>
						<p>Usage of Google task REST API</p>
						<p>Solution written in HTML/CSS/Javascript and usign React as framework</p>
					</div>
					<div className="mdl-card__actions mdl-card--border">
						<button onClick={onLogin} className="mdl-button mdl-js-button mdl-button--colored mdl-js-ripple-effect">Google login</button>
					</div>
				</div>
				
			</div>
		);
	}
}

LoginForm.propTypes = {
	onLogin: PropTypes.func.isRequired
};

export default LoginForm;
