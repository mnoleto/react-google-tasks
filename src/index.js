/* eslint-disable import/default */

import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import createRoutes from './routes';
import configureStore from './store/configureStore';
import { syncHistoryWithStore } from 'react-router-redux';
import fetchGoogleAuth from './services/fetchGoogleAuth';
import fetchDataForRoute from './utils/fetchDataForRoute';
import * as types from './constants/actionTypes';
import initialState from './reducers/initialState';

require('./favicon.ico'); // Tell webpack to load favicon.ico
import './styles/styles.scss'; // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);
const routes = createRoutes(store);

window.__INITIAL_STATE__ = initialState;

/**
 * Callback function handling frontend route changes.
 */
function onUpdate() {
	// Prevent duplicate fetches when first loaded.
	// Explanation: On server-side render, we already have __INITIAL_STATE__
	// So when the client side onUpdate kicks in, we do not need to fetch twice.
	// We set it to null so that every subsequent client-side navigation will
	// still trigger a fetch data.
	// Read more: https://github.com/choonkending/react-webpack-node/pull/203#discussion_r60839356
	if (window.__INITIAL_STATE__ !== null) {
		window.__INITIAL_STATE__ = null;
		return;
	}
	
	store.dispatch({ type: types.CREATE_REQUEST });
	return fetchDataForRoute(this.state)
		.then(data => {
			return store.dispatch({ type: types.REQUEST_SUCCESS, data });
		});
}

window.handleClientLoad = () => {
	fetchGoogleAuth(true, () => {
		// initialState.user.authenticated = true;
		store.dispatch({ type: types.CREATE_SESSION_SUCCESS });

		render(
			<Provider store={store}>
				<Router history={history} onUpdate={onUpdate}>
					{routes}
				</Router>
			</Provider>, document.getElementById('app')
		);
	});
}
