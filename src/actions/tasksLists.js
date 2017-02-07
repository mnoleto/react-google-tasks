import * as types from '../constants/actionTypes';

// INSERT ACTION CREATORS
export function insertTasksListFailure(error) {
	return {
		type: types.INSERT_TASKSLIST_FAILURE,
		error
	};
}

export function insertTasksListRequest() {
	return {
		type: types.INSERT_TASKSLIST_REQUEST
	};
}

export function insertTasksListSuccess(data) {
	return {
		type: types.INSERT_TASKSLIST_SUCCESS,
		data
	};
}

// thunk for create a user session
export function insertTasksList(title) {
	return (dispatch) => {
		// Optimistic update
		dispatch(insertTasksListRequest());

		let promise = new Promise((resolve, reject) => {
			window.gapi.client.tasks.tasklists.insert({ title }).execute(res => (res.error) ? reject(res.error) : resolve(res));
		});

		return promise.then(function(res) {
			dispatch(insertTasksListSuccess(res));
		})
		.catch(function(error) {
			dispatch(insertTasksListFailure(error));
		});
	};
}

// DELETE ACTION CREATORS
export function deleteTasksListFailure(error) {
	return {
		type: types.DELETE_TASKSLIST_FAILURE,
		error
	};
}

export function deleteTasksListRequest(id) {
	return {
		type: types.DELETE_TASKSLIST_REQUEST,
		id
	};
}

export function deleteTasksListSuccess() {
	return {
		type: types.DELETE_TASKSLIST_SUCCESS
	};
}

// thunk for create a user session
export function deleteTasksList(taskListId) {
	return dispatch => {
		// Optimistic update
		dispatch(deleteTasksListRequest(taskListId));

		let promise = new Promise((resolve, reject) => {
			window.gapi.client.tasks.tasklists.delete({
				tasklist: taskListId
			}).execute(res => (res.error) ? reject(res.error) : resolve(res));
		});

		return promise.then(function(res) {
			dispatch(deleteTasksListSuccess(res));
		})
		.catch(function(error) {
			dispatch(deleteTasksListFailure(error));
		});
	};
}

// UPDATE ACTION CREATORS
export function updateTasksListFailure(error) {
	return {
		type: types.UPDATE_TASKSLIST_FAILURE,
		error
	};
}

export function updateTasksListRequest(id, title) {
	return {
		type: types.UPDATE_TASKSLIST_REQUEST,
		id,
		title
	};
}

export function updateTasksListSuccess() {
	return {
		type: types.UPDATE_TASKSLIST_SUCCESS
	};
}

// thunk for create a user session
export function updateTasksList(taskListId, title) {
	return (dispatch) => {

		if(!taskListId || taskListId === '') return false;

		// Optimistic update
		dispatch(updateTasksListRequest(taskListId, title));

		let promise = new Promise((resolve, reject) => {
			window.gapi.client.tasks.tasklists.update({
				tasklist: taskListId,
				id: taskListId,
				title
			}).execute(res => (res.error) ? reject(res.error) : resolve(res));
		});

		return promise.then(function(res) {
			dispatch(updateTasksListSuccess(res));
		})
		.catch(function(error) {
			dispatch(updateTasksListFailure(error));
		});
	};
}