import * as types from '../constants/actionTypes';
import initialState from './initialState';

// // IMPORTANT: Note that with Redux, state should NEVER be changed.
// // State is considered immutable. Instead,
// // create a copy of the state passed and set new values on the copy.
// // Note that I'm using Object.assign to create a copy of current state
// // and update values on the copy.
export default function tasksLists(state = initialState.tasksLists, action) {
	switch (action.type) {
		case types.REQUEST_SUCCESS:
			if (action.data) return action.data.items;
			return state;
		case types.INSERT_TASKSLIST_SUCCESS:
			if(action.data) return [...state, action.data];
			return state;
		case types.DELETE_TASKSLIST_REQUEST:
			return [...state.filter((tp) => tp.id !== action.id)];
		case types.UPDATE_TASKSLIST_REQUEST:
			return [...state.map(function(value) {
				if(value.id === action.id) {
					return Object.assign({}, value, {
						title: action.title
					});
				} else {
					return Object.assign({}, value);
				}
			})];
		case types.INSERT_TASKSLIST_FAILURE:
		case types.DELETE_TASKSLIST_FAILURE:
		case types.UPDATE_TASKSLIST_FAILURE:
			return [...state.filter((tp) => tp.id !== action.id)];

		default:
			return state;
	}
}
