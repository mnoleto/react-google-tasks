import React from 'react';
import { Route, IndexRoute } from 'react-router';
import fetchTasksLists from './services/fetchTasksLists';

import App from './components/App';
import LoginPage from './containers/LoginPage';
import TasksPage from './containers/TasksPage';
import NotFoundPage from './components/NotFoundPage';

export default (store) => {
	const requireAuth = (nextState, replace, callback) => {
		const { user: { authenticated }} = store.getState();
		if (!authenticated) {
			replace({
				pathname: '/login',
				state: { nextPathname: nextState.location.pathname }
			});
		}
		callback();
	};

	const redirectAuth = (nextState, replace, callback) => {
		const { user: { authenticated }} = store.getState();
		if (authenticated) {
			replace({
				pathname: '/'
			});
		}
		callback();
	};

	return (
		<Route path="/" component={App}>
			<IndexRoute component={TasksPage} onEnter={requireAuth} fetchData={fetchTasksLists} />
			<Route path="login" component={LoginPage} onEnter={redirectAuth} />
			<Route path="*" component={NotFoundPage}/>
		</Route>
	);
};