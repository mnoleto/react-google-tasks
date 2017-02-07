import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LoginForm from '../components/LoginForm';
import * as actions from '../actions/login';

export const LoginPage = ({ actions }) => {
	return (
			<LoginForm
				onLogin={actions.createSession}
			/>
		);
};

LoginPage.propTypes = {
	authenticated: PropTypes.bool.isRequired,
	actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
		authenticated: state.user.authenticated
  };
}

function mapDispatchToProps(dispatch) {
  return {
	actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);