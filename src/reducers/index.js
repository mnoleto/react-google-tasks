import { combineReducers } from 'redux';
import * as types from '../constants/actionTypes';
import user from './login';
import tasksLists from './tasksLists';
import tasks from './tasks';
import { routerReducer } from 'react-router-redux';

const isFetching = (state = false, action) => {
	switch (action.type) {
		case types.CREATE_REQUEST:
		case types.DELETE_TASKSLIST_REQUEST:
		case types.FETCH_TASKS_REQUEST:
		case types.INSERT_TASK_REQUEST:
		case types.INSERT_TASKSLIST_REQUEST:
		case types.UPDATE_TASK_REQUEST:
		case types.UPDATE_TASKSLIST_REQUEST:
			return true;
		case types.DELETE_TASK_FAILURE:
		case types.DELETE_TASK_REQUEST:
		case types.FETCH_TASKS_FAILURE:
		case types.FETCH_TASKS_SUCCESS:
		case types.INSERT_TASK_FAILURE:
		case types.INSERT_TASK_SUCCESS:
		case types.INSERT_TASKSLIST_FAILURE:
		case types.INSERT_TASKSLIST_SUCCESS:
		case types.DELETE_TASKSLIST_FAILURE:
		case types.DELETE_TASKSLIST_SUCCESS:
		case types.UPDATE_TASK_FAILURE:
		case types.UPDATE_TASK_SUCCESS:
		case types.UPDATE_TASKSLIST_FAILURE:
		case types.UPDATE_TASKSLIST_SUCCESS:
		case types.REQUEST_FAILURE:
		case types.REQUEST_SUCCESS:
			return false;
		default:
			return state;
	}
};

const rootReducer = combineReducers({
	isFetching,
	routing: routerReducer,
	tasks,
	tasksLists,
	user
});

export default rootReducer;
