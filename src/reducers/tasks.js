import * as types from '../constants/actionTypes';
import initialState from './initialState';

// // IMPORTANT: Note that with Redux, state should NEVER be changed.
// // State is considered immutable. Instead,
// // create a copy of the state passed and set new values on the copy.
// // Note that I'm using Object.assign to create a copy of current state
// // and update values on the copy.
export default function tasks(state = {
	viewType: initialState.tasks.viewType,
	tasks: initialState.tasks.tasks
}, action) {
	let newState;

	switch (action.type) {
		case types.DELETE_TASK_REQUEST:
			return {
				viewType: state.viewType,
				tasks: [...state.tasks.filter((tp) => tp.id !== action.id)]
			}
		case types.FETCH_TASKS_SUCCESS:
			if (action.data) return { viewType: state.viewType, tasks: action.data };
			return [];
		case types.INSERT_TASK_SUCCESS:
			if(action.data) return {
				viewType: state.viewType,
				tasks: [...state.tasks, action.data] 
			};
			return state
		case types.SET_TASK_VIEWTYPE:
			if(action.view) return { viewType: action.view, tasks: state.tasks }
			return state
		case types.UPDATE_TASK_REQUEST:
			return {
				viewType: state.viewType,
				tasks: [...state.tasks.map(function(value, index) {
					if(value.id === action.id) {
						return Object.assign({}, value, {
							title: action.title
						});
					} else {
						return Object.assign({}, value);
					}
				})]
			}
		case types.UPDATE_TASK_SUCCESS:
			return {
				viewType: state.viewType,
				tasks: [...state.tasks.map(function(value, index) {
					if(value.id === action.data.id) {
						return Object.assign({}, value, action.data);
					} else {
						return Object.assign({}, value);
					}
				})]
			}
		case types.INSERT_TASK_FAILURE:
		case types.DELETE_TASK_FAILURE:
		case types.UPDATE_TASK_FAILURE:
			return {
				viewType: state.viewType,
				tasks: [...state.tasks.filter((tp) => tp.id !== action.id)]
			}

		default:
			return state;
	}
}
